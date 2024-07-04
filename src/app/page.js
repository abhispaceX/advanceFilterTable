"use client"
import { useState } from 'react';
import CustomerTable from './customerTable';
import Search from './searchBar';
import Pagination from './pagination';
import FilterModal from './filterModel';
import { CustomersData } from './utils/tableData';

export default function Home() {
  const [customers, setCustomers] = useState(CustomersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [logicalOperators, setLogicalOperators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedField, setSelectedField] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (field) => {
    setSortBy(field);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterApply = (newFilters, newLogicalOperators) => {
    setFilters(Filters);
    setLogicalOperators(newLogicalOperators);
    // Recalculate filtered customers
    const filtered = customers.filter((customer) => {
      const searchText = searchTerm.toLowerCase();
      const matchesSearch = (
        customer.customer_name.toLowerCase().includes(searchText) ||
        customer.location.toLowerCase().includes(searchText) ||
        customer.phone.toLowerCase().includes(searchText) ||
        customer.gender.toLowerCase().includes(searchText)
      );
  
      if (!newFilters.length) return matchesSearch;
  
      const matchesFilters = newFilters.reduce((result, filter, index) => {
        const filterResult = applyFilter( filter);
        if (index === 0) return filterResult;
        const operator = newLogicalOperators[index - 1];
        return operator === 'AND' ? (result && filterResult) : (result || filterResult);
      }, true);
  
      return matchesSearch && matchesFilters;
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleNewFilter = (field) => {
    setSelectedField(field);
    setModalShow(true);
  };

  const applyFilter = (customer, filter) => {
    const { field, criteria, value } = filter;
    let fieldValue = customer[field]?.toString().toLowerCase();
    const filterValue = value ? value.toLowerCase() : '';

    switch (field) {
      case 'gender':
        return customer.gender.toLowerCase() === criteria.toLowerCase();
      case 'created_at':
        const customerDate = new Date(customer.created_at);
        const filterDate = new Date(value);
        switch (criteria) {
          case 'Before':
            return customerDate < filterDate;
          case 'After':
            return customerDate > filterDate;
          case 'On':
            return customerDate.toDateString() === filterDate.toDateString();
        }
        break;
      default:
        switch (criteria) {
          case 'contains':
            return fieldValue?.includes(filterValue);
          case 'not contains':
            return !fieldValue?.includes(filterValue);
          case 'starts with':
            return fieldValue?.startsWith(filterValue);
          case 'ends with':
            return fieldValue?.endsWith(filterValue);
          case 'exists':
            return fieldValue != null && fieldValue !== '';
          case 'not exists':
            return fieldValue == null || fieldValue === '';
        }
    }
    return false;
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchText = searchTerm.toLowerCase();
    const matchesSearch = (
      customer.customer_name.toLowerCase().includes(searchText) ||
      customer.location.toLowerCase().includes(searchText) ||
      customer.phone.toLowerCase().includes(searchText) ||
      customer.gender.toLowerCase().includes(searchText)
    );

    if (!filters.length) return matchesSearch;
    const matchesFilters = filters.reduce((result, filter, index) => {
      const filterResult = applyFilter(customer, filter);
      if (index === 0) return filterResult;
      const operator = logicalOperators[index - 1];
      return operator === 'AND' ? (result && filterResult) : (result || filterResult);
    }, true);

    return matchesSearch && matchesFilters;
  });

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortBy === 'time' && a.created_at && b.created_at) {
      const timeA = a.created_at.split(' ')[1] ?? '';
      const timeB = b.created_at.split(' ')[1] ?? '';
      return timeA.localeCompare(timeB);
    } else {
      return 0;
    }
  });

  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * 20,
    currentPage * 20
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Data</h1>
      <Search 
        onSearch={handleSearch} 
        onFilterApply={handleFilterApply} 
        filters={filters}
        onNewFilter={handleNewFilter}
      />
      <CustomerTable
        customers={paginatedCustomers}
        onSort={handleSort}
        sortBy={sortBy}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCustomers.length / 20)}
        onPageChange={handlePageChange}
      />
      <FilterModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setSelectedField('');
        }}
        onFilterApply={(filter) => {
          const newFilters = [...filters, filter];
          const newLogicalOperators = [...logicalOperators, 'AND'];
          handleFilterApply(newFilters, newLogicalOperators);
          setModalShow(false);
          setSelectedField('');
        }}
        selectedField={selectedField}
      />
    </div>
  );
}