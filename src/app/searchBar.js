"use client";
import { useState } from 'react';
import FilterModal from './filterModel';

export default function Search({ onSearch, onFilterApply, filters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAdv, setShowadv] = useState(false);
  const [logicalOperators, setLogicalOperators] = useState(filters.map(() => 'AND'));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };
  

  const handleColumnChange = (event) => {
    const newColumn = event.target.value;
    setSelectedColumn(newColumn);
    if (newColumn) {
      setModalShow(true);
    }
    setShowDropdown(false);
  };
  const handleDropdownChange = (e) => {
    setShowDropdown(!showDropdown);
  }
  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    
    onFilterApply(newFilters);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleFilterApply = (filter) => {
    const newFilters = [...filters, filter];
    const newLogicalOperators = [...logicalOperators, 'AND'];
    setLogicalOperators(newLogicalOperators);
    onFilterApply(newFilters, newLogicalOperators);
  };
  
  const handleLogicalOperatorChange = (index, operator) => {
    const newOperators = [...logicalOperators];
    newOperators[index - 1] = operator; // Change index to index - 1
    setLogicalOperators(newOperators);
    onFilterApply(filters, newOperators);
  };

  const showAdvanceFilters = () => {
    setShowadv(!showAdv);
  };

  return (
    <div className=' flex flex-col   ' >
      <div className=' bg-white mb-5 ' >
      <div className="relative flex  w-full  py-2 mb-6rounded-lg border-b ">
        <form className="flex justify-end  w-6/12  border-r  ">
        <svg className='mt-3' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
        </svg>
          <input
            type="text"
            id="search"
            name="search"
            
            placeholder="Search name,email or phone number"
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow p-3 text-gray-700  rounded-lg focus:outline-none  "
          />
        </form>
        <div className=' absolute  right-3'>
        <button className='border  p-2.5 rounded-lg' >Export</button>
        </div>
      </div>
      <div className='py-2'>
        <label className=' font-bold mx-7 ' >Filter:</label>
      <button type="button" className="p-2 m-2 w-32 text-sm bg-blue-600 text-white rounded-md" onClick={showAdvanceFilters}>
       {showAdv?'Hide':'Advance Filters'}
      </button>
      </div>
      </div>
      {showAdv &&
        <div className="  flex  bg-white  w-full p-4 space-y-4 relative">
          <div className=" absolute top-0">
            <label className='font-bold'>Advanced Features</label>
            <span className='text-lg'>({filters.length} )</span>
          </div>
      {filters.map((filter, index) => (
     <div key={index} className="flex items-center  space-x-2">
     <div className="relative w-64 h-16  bg-gray-100 rounded-lg border border-gray-300 p-2 flex flex-col justify-between">
       <div className="flex justify-between items-start">
         <span className="text-sm font-bold text-gray-700">{filter.field}</span>
         <button
           className="text-gray-500 hover:text-gray-700 font-bold"
           onClick={() => handleRemoveFilter(index)}
         >
           ×
         </button>
       </div>
       <div className="text-sm text-gray-600">
         {`${filter.criteria} ${filter.value}`}
       </div>
     </div>
    {index < filters.length - 1 && ( // Change condition to index < filters.length - 1
      <select
        value={logicalOperators[index]}
        onChange={(e) => handleLogicalOperatorChange(index + 1, e.target.value)}
        className="form-select p-2 text-gray-700 bg-white rounded-lg border  focus:outline-none  "
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
    )}
  </div>
))}
          <button
            type=" button"
            className= " p-2  mx-2 h-12 text-sm bg-blue-200 hover:bg-blue-100 rounded-lg w-32"
            onClick={handleDropdownChange}
            

          >
            New filter
          </button>
          {showDropdown && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <select
                className="form-select w-full p-3 text-gray-700 bg-white rounded-lg transition-all duration-200 focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-blue-500"
                value={selectedColumn}
                onChange={handleColumnChange}
                size={5}
              >
                <option value="">Select Column</option>
                <option value="customer_name">Name</option>
                <option value="location">Location</option>
                <option value="phone">Phone</option>
                <option value="gender">Gender</option>
                <option value="created_at">Created At</option>
              </select>
            </div>
          )}
        </div>
      }
      <FilterModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setSelectedColumn('');
        }}
        onFilterApply={(filter) => {
          handleFilterApply(filter);
          setModalShow(false);
          setSelectedColumn('');
        }}
        selectedField={selectedColumn}
      />
    </div>
  );
}