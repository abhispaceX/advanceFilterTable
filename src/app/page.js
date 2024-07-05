"use client"
import { useState } from 'react';
import CustomerTable from './customerTable';
import Sidebar from './Sidebar';
import Search from './searchBar';
import Pagination from './pagination';
import FilterModal from './filterModel';
import { CustomersData } from './utils/tableData';
import Navbar from './Navbar';

export default function Home() {
  const [customers, setCustomers] = useState(CustomersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [logicalOperators, setLogicalOperators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [groups, setGroups] = useState([{ filters: [], logicalOperators: [] }]);
  const [groupRelation, setGroupRelation] = useState(['AND']);
  const [activeGroupIndex,setActiveGroupIndex]=useState(1)

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (field) => {
    setSortBy(field);
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNewGroup = () => {
    setGroups([...groups, { filters: [], logicalOperators: [] }]);
  };
  

  const handleFilterApply = (newFilters, newLogicalOperators, groupIndex = 0) => {
    const newGroups = [...groups];
    newGroups[groupIndex] = { filters: newFilters, logicalOperators: newLogicalOperators };
    setGroups(newGroups);
    setLogicalOperators(newLogicalOperators)
    const filterStructure = {
      relation: groupRelation[0],
      groups: newGroups.map((group, index) => ({
        relation: (group.logicalOperators[0] || "and").toLowerCase(),
        conditions: group.filters.map(filter => ({
          value: filter.value,
          operator: filter.operator,
          variable: filter.variable
        }))
      }))
    };
  
    console.log(filterStructure);
    
    // If all filters are cleared, reset to original data
    if (newGroups.every(group => group.filters.length === 0)) {
      setCustomers(CustomersData);
      setCurrentPage(1);
      return;
    }
    
    // Rest of the filtering logic...
    const filtered = CustomersData.filter((customer) => {
      const searchText = searchTerm.toLowerCase();
      const matchesSearch = (
        customer.customer_name.toLowerCase().includes(searchText) ||
        customer.location.toLowerCase().includes(searchText) ||
        customer.phone.toLowerCase().includes(searchText) ||
        customer.gender.toLowerCase().includes(searchText)
      );
  
      if (newGroups.length === 0) return matchesSearch;
  
      const matchesGroups = newGroups.reduce((groupResult, group, gIndex) => {
        const groupMatch = group.filters.reduce((result, filter, index) => {
          const filterResult = applyFilter(customer, filter);
          if (index === 0) return filterResult;
          const operator = group.logicalOperators[index - 1] || "AND";
          return operator === 'AND' ? (result && filterResult) : (result || filterResult);
        }, true);
  
        if (gIndex === 0) return groupMatch;
        return groupRelation[gIndex - 1] === 'AND' ? (groupResult && groupMatch) : (groupResult || groupMatch);
      }, true);
  
      return matchesSearch && matchesGroups;
    });
  
    setFilters(newGroups.flatMap(group => group.filters));
    setLogicalOperators(newGroups.flatMap(group => group.logicalOperators));
    setCustomers(filtered);
    setCurrentPage(1);
  };

  const handleNewFilter = (field) => {
    setSelectedField(field);
    setModalShow(true);
  };

  const applyFilter = (customer, filter) => {
    const { variable, operator, value } = filter;
    let fieldValue = customer[variable]?.toString().toLowerCase();
    const filterValue = value ? value.toLowerCase() : '';

    switch (variable) {
      case 'gender':
        return customer.gender.toLowerCase() === value.toLowerCase();
      case 'created_at':
        const customerDate = new Date(customer.created_at);
        const filterDate = new Date(value);
        switch (operator) {
          case 'Before':
            return customerDate < filterDate;
          case 'After':
            return customerDate > filterDate;
          case 'On':
            return customerDate.toDateString() === filterDate.toDateString();
        }
        break;
      default:
        switch (operator) {
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

  const sortedCustomers = customers.sort((a, b) => {
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

  const userName = "John Doe"; // Replace with actual user name
  const userInitials = userName ? userName.slice(0, 2).toUpperCase() : ""; 

  return (
    <div className="container gap-2 h-screen bg-gray-50 flex">
      <div>
        <Sidebar />
      </div>
      <div className='w-full overflow-y-scroll'> 
        <Navbar userName={userName} userInitials={userInitials} />
        <Search 
          onSearch={handleSearch} 
          onFilterApply={handleFilterApply} 
          filters={filters}
          groups={groups}
          onNewGroup={handleNewGroup}
          groupRelation={groupRelation}
          setGroupRelation={setGroupRelation}
          onNewFilter={handleNewFilter}
        />
        <CustomerTable
          customers={paginatedCustomers}
          onSort={handleSort}
          sortBy={sortBy}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(customers.length / 20)}
          onPageChange={handlePageChange}
        />
        <FilterModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setSelectedField('');
          }}
          onFilterApply={(filter) => {
            const newGroups = [...groups];
            newGroups[activeGroupIndex].filters.push(filter);
            if (newGroups[activeGroupIndex].filters.length > 1) {
              newGroups[activeGroupIndex].logicalOperators.push('AND');
            }
            handleFilterApply(newGroups[activeGroupIndex].filters, newGroups[activeGroupIndex].logicalOperators, activeGroupIndex);
            setModalShow(false);
            setSelectedField('');
          }}
          selectedField={selectedField}
          groupIndex={activeGroupIndex}
        />
      </div>
    </div>
  );
}
