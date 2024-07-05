"use client"
import React from 'react';
import { format } from 'date-fns'
import { BsArrowDownUp } from "react-icons/bs";

const CustomerTable = ({ customers, onSort, sortBy }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MM/dd/yyyy');
  };

  return (
    <table className=" relative table-auto bg-white w-full mt-4">
      <thead>
      <tr>
  <th onClick={() => onSort('name')} className="cursor-pointer">
    <div className="flex ml-24 items-center">
      <span>Name</span>
      <BsArrowDownUp className="ml-1 h-3" />
    </div>
  </th>
  <th onClick={() => onSort('location')} className="cursor-pointer">
    <div className="flex ml-16 items-center">
      <span>Location</span>
      <BsArrowDownUp className="ml-1 h-3" />
    </div>
  </th>
  <th onClick={() => onSort('phone')} className="cursor-pointer">
    <div className="flex ml-14 items-center">
      <span>Phone</span>
      <BsArrowDownUp className="ml-1 h-3 " />
    </div>
  </th>
  <th onClick={() => onSort('gender')} className="cursor-pointer">
    <div className="flex ml-9 items-center">
      <span>Gender</span>
      <BsArrowDownUp className="ml-1 h-3 " />
    </div>
  </th>
  <th onClick={() => onSort('date')} className="cursor-pointer">
    <div className="flex ml-12 items-center">
      <span>Date</span>
      <BsArrowDownUp className="ml-1 h-3 " />
    </div>
  </th>
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