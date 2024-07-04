"use client"; // Ensure this is treated as a client component

import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center my-5">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className={`border-none px-4 py-2 rounded-lg cursor-pointer mx-1 transition-colors duration-200 bg-gray-200 text-gray-800 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
      >
        Previous
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`border-none px-4 py-2 rounded-lg cursor-pointer mx-1 transition-colors duration-200 bg-gray-200 text-gray-800 ${currentPage === page ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
          onClick={() => handlePageClick(page)}
          style={{ animation: currentPage === page ? 'pulse 0.5s ease-in-out infinite' : 'none' }}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        className={`border-none px-4 py-2 rounded-lg cursor-pointer mx-1 transition-colors duration-200 bg-gray-200 text-gray-800 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;