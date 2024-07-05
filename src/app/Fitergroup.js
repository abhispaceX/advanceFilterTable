import React from 'react';

const FilterGroups = ({ filterGroups, onNewFilter, onNewGroup }) => {
  return (
    <div className="filter-groups">
      {filterGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="filter-group mb-4 p-2 border rounded">
          {group.map((filter, filterIndex) => (
            <div key={filterIndex} className="filter-item mb-2">
              {`${filter.field} ${filter.criteria} ${filter.value}`}
            </div>
          ))}
          {group.length >= 2 && (
            <button 
              onClick={() => onNewFilter(groupIndex)} 
              className="new-filter-btn bg-blue-500 text-white px-2 py-1 rounded"
            >
              New Filter
            </button>
          )}
          {groupIndex === filterGroups.length - 1 && group.length >= 2 && (
            <button 
              onClick={onNewGroup} 
              className="new-group-btn bg-green-500 text-white px-2 py-1 rounded ml-2"
            >
              New Group
            </button>
          )}
        </div>
      ))}
      {filterGroups[filterGroups.length - 1].length < 2 && (
        <button 
          onClick={() => onNewFilter(filterGroups.length - 1)} 
          className="new-filter-btn bg-blue-500 text-white px-2 py-1 rounded"
        >
          New Filter
        </button>
      )}
    </div>
  );
};

export default FilterGroups;