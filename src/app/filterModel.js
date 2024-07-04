"use client"
import { useState, useEffect } from 'react';

export default function FilterModal({ show, onHide, onFilterApply, selectedField }) {
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    // Reset criteria and value when field changes
    setSelectedCriteria('');
    setValue('');
  }, [selectedField]);

  const handleApplyFilter = () => {
    let filterValue = value;
    if (selectedField === 'gender') {
      filterValue = selectedCriteria;
    }
    onFilterApply({
      field: selectedField,
      criteria: selectedCriteria,
      value: filterValue,
       
    });
    onHide();
  };

  const getCriteriaOptions = () => {
    switch (selectedField) {
      case 'gender':
        return ['Male', 'Female', 'Non-binary'];
      case 'created_at':
        return ['Before', 'After', 'On'];
      default:
        return ['contains', 'not contains', 'starts with', 'ends with', 'exists', 'not exists'];
    }
  };

  const getInputType = () => {
    switch (selectedField) {
      case 'created_at':
        return 'date';
      case 'phone':
        return 'tel';
      default:
        return 'text';
    }
  };

  const showInputForCriteria = (criteria) => {
    return selectedField !== 'gender' && 
           criteria !== 'exists' && 
           criteria !== 'not exists';
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white rounded-lg p-6 shadow-lg z-10 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Apply Filter: {selectedField}</h2>
          <button className="text-gray-600 hover:text-gray-900" onClick={onHide}>
            &times;
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Criteria</label>
          <div>
            {getCriteriaOptions().map((criteria) => (
              <div key={criteria} className="flex flex-col mb-2">
                <div className="flex items-center">
                  <input
                    className="form-radio mr-2"
                    type="radio"
                    name="criteria"
                    value={criteria}
                    checked={selectedCriteria === criteria}
                    onChange={(e) => {
                      setSelectedCriteria(e.target.value);
                      if (!showInputForCriteria(e.target.value)) {
                        setValue('');
                      }
                    }}
                  />
                  <label className="text-sm">{criteria}</label>
                </div>
                {selectedCriteria === criteria && showInputForCriteria(criteria) && (
                  <input
                    type={getInputType()}
                    className="form-input w-full p-2 border rounded mt-1"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter value..."
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onHide}>
            Close
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleApplyFilter}>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}