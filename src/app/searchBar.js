"use client";
import { useState } from 'react';
import FilterModal from './filterModel';
import { IoMdArrowDropdown } from "react-icons/io";

export default function Search({ onSearch, onFilterApply, groups, onNewGroup, groupRelation, setGroupRelation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAdv, setShowadv] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [filterInput, setFilterInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const allOptions = [
    { value: "customer_name", label: "Name" },
    { value: "location", label: "Location" },
    { value: "phone", label: "Phone" },
    { value: "gender", label: "Gender" },
    { value: "created_at", label: "Created At" },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };
  const handleGroupRelationChange = (index, relation) => {
    const newGroupRelations = [...groupRelation];
    newGroupRelations[index] = relation;
    setGroupRelation(newGroupRelations);
}

  const handleColumnChange = (selectedValue) => {
    setSelectedColumn(selectedValue);
    setModalShow(true);
    setShowDropdown(false);
  };

  const handleDropdownChange = (groupIndex) => {
    setActiveGroupIndex(groupIndex);
    setShowDropdown(true);
    setFilterInput('');
    setFilteredOptions(allOptions);
  };

  const handleFilterInputChange = (e) => {
    const input = e.target.value;
    setFilterInput(input);
    const filtered = allOptions.filter(option => 
      option.label.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleRemoveFilter = (groupIndex, filterIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].filters = newGroups[groupIndex].filters.filter((_, i) => i !== filterIndex);
    newGroups[groupIndex].logicalOperators = newGroups[groupIndex].logicalOperators.filter((_, i) => i !== filterIndex - 1);
    onFilterApply(newGroups[groupIndex].filters, newGroups[groupIndex].logicalOperators, groupIndex);
  };

  const handleClearAllFilters = () => {
    const newGroups = groups.map(() => ({ filters: [], logicalOperators: [] }));
    onFilterApply(newGroups[0].filters, newGroups[0].logicalOperators, 0);
  };
  const handleClearGroupFilters = (groupIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].filters = [];
    newGroups[groupIndex].logicalOperators = [];
    onFilterApply(newGroups[groupIndex].filters, newGroups[groupIndex].logicalOperators, groupIndex);
  };
  

  const handleLogicalOperatorChange = (groupIndex, filterIndex, operator) => {
    const newGroups = [...groups];
    newGroups[groupIndex].logicalOperators[filterIndex - 1] = operator;
    onFilterApply(newGroups[groupIndex].filters, newGroups[groupIndex].logicalOperators, groupIndex);
  };

  const showAdvanceFilters = () => {
    setShowadv(!showAdv);
  };
  const totalFilters = groups.reduce((total, group) => total + group.filters.length, 0);

  return (
    <div className='flex flex-col mt-24'>
      <div className='bg-white mb-5'>
        <div className="relative flex w-full py-2 mb-6 rounded-lg border-b">
          <form className="flex justify-end w-6/12 border-r">
            <svg className='mt-3' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search name, email or phone number"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-3 text-gray-700 rounded-lg focus:outline-none"
            />
          </form>
          <div className='absolute right-3'>
            <button className='border p-2.5 rounded-lg'>Export</button>
          </div>
        </div>
        <div className='relative py-2'>
          <label className='font-bold mx-7'>Filter:</label>
          <select className='border p-2 bg-gray-200 outline-none'>
            <option value="name">fxtyxtgdcy</option>
            <option value="email">sdgjghwdwdg</option>
            <option value="phone">bsdjkwqdn</option>
          </select>
          <select className='border p-2 bg-gray-200 outline-none ml-2'>
            <option value="name">test property</option>
            <option value="email">sdgjghwdwdg</option>
            <option value="phone">bsdjkwqdn</option>
          </select>
          <button type="button" className="p-2 m-2 w-36 text-m bg-blue-100 text-black rounded-md" onClick={showAdvanceFilters}>
            {showAdv ? 'Hide Advance' : 'Show Advance'}
          </button>
          <div className='absolute top-4 right-32'>
            <button className='border p-2.5'>Config</button>
          </div>
          <div className='absolute top-4 right-4'>
            <button className='border p-2.5'>Refresh</button>
          </div>
        </div>
      </div>
      
      {showAdv && (
        <div className='mb-4'>
        
          <div className=' border-b h-10 bg-white' >
            <label className='text-xl ml-8 mt-6  font-semibold' >Advance Filters {totalFilters} </label>
          </div>
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <div className="bg-white p-4 flex space-y-4 relative">
          
                {group.filters.map((filter, index) => (
                  <div key={index} className="flex flex-row items-center space-x-2">
                    <div className="relative w-64 h-16 bg-gray-100 rounded-lg border border-gray-300 p-2 flex m-2 mt-1 flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-gray-700">{filter.variable}</span>
                        <button
                          className="text-gray-500 hover:text-gray-700 font-bold"
                          onClick={() => handleRemoveFilter(groupIndex, index)}
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {`${filter.operator} ${filter.value}`}
                      </div>
                    </div>
                    
                    {index < group.filters.length - 1 && (
                      <select
                        value={group.logicalOperators[index]}
                        onChange={(e) => handleLogicalOperatorChange(groupIndex, index + 1, e.target.value)}
                        className="form-select p-2 text-gray-700 bg-white rounded-lg border m-4 focus:outline-none"
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    )}
                  </div>
                ))}
                {!showDropdown || activeGroupIndex !== groupIndex ? (
                  <button
                    type="button"
                    className="p-2 mx-2 h-12 text-sm bg-blue-200 hover:bg-blue-100 rounded-lg w-32"
                    onClick={() => handleDropdownChange(groupIndex)}
                  >
                    New filter
                  </button>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      value={filterInput}
                      onChange={handleFilterInputChange}
                      className="form-input w-80 p-2 border border-gray-300 rounded-lg"
                      placeholder="Search for a column..."
                    />
                    <div className="absolute top-full left-0 w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleColumnChange(option.value)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                        <button className=' border p-3 top-4 absolute right-3' onClick={handleClearAllFilters} >Clear All</button>
                      </div>
              </div>
              {groupIndex < groups.length - 1 && (
                <select
                  value={groupRelation}
                  onChange={(e) => setGroupRelation(e.target.value)}
                  className="form-select p-2 text-gray-700 bg-white rounded-lg border focus:outline-none"
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              )}
            </div>
          ))} 
          <div className='bg-white'>
            <div className="mt-4 p-4 rounded-lg">
              <button
                type="button"
                className="p-2 mx-2 h-12 text-sm bg-green-200 hover:bg-green-100 rounded-lg w-32"
                onClick={onNewGroup}
              >
                New Group
              </button>
              <button
                type="button"
                className="p-2 mx-2 h-12 text-sm bg-red-200 hover:bg-red-100 rounded-lg w-32"
                onClick={handleClearAllFilters}
              >
                Clear Groups
              </button>
            </div>
          </div>
        </div>
      )}
      
      <FilterModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setSelectedColumn('');
        }}
        onFilterApply={(filter) => {
          const newGroups = [...groups];
          newGroups[activeGroupIndex].filters.push(filter);
          if (newGroups[activeGroupIndex].filters.length > 1) {
            newGroups[activeGroupIndex].logicalOperators.push('AND');
          }
          onFilterApply(newGroups[activeGroupIndex].filters, newGroups[activeGroupIndex].logicalOperators, activeGroupIndex);
          setModalShow(false);
          setSelectedColumn('');
          setShowDropdown(false);
        }}
        selectedField={selectedColumn}
        groupIndex={activeGroupIndex}
      />
    </div>
  );
}