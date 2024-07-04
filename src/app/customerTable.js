"use client"
import React from 'react';
import { format } from 'date-fns'

const CustomerTable = ({ customers, onSort, sortBy }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MM/dd/yyyy');
  };

  return (
    <table className="table-auto bg-white w-full mt-4">
      <thead>
        <tr>
          <th onClick={() => onSort('name')} className="cursor-pointer">Name</th>
          <th onClick={() => onSort('location')} className="cursor-pointer">Location</th>
          <th onClick={() => onSort('phone')} className="cursor-pointer">Phone</th>
          <th onClick={() => onSort('gender')} className="cursor-pointer">Gender</th>
          <th onClick={() => onSort('date')} className="cursor-pointer">Date</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={index} className="hover:bg-gray-100   border-b ">
            <td className="p-4 text-center">{customer.customer_name}</td>
            <td className="p-4 text-center">{customer.location}</td>
            <td className="p-4 text-center">{customer.phone}</td>
            <td className="p-4 text-center">{customer.gender}</td>
            <td className="p-4 text-center">{formatDate(customer.created_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;