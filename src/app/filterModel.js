"use client"
import { useState, useEffect } from 'react';

export default function FilterModal({ show, onHide, onFilterApply, selectedField, groupIndex }) {
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setSelectedCriteria('');
    setValue('');
  }, [selectedField]);

  const handleApplyFilter = () => {
    let filterValue = value;
    if (selectedField === 'gender') {
      filterValue = value;
    }
    onFilterApply({
      variable: selectedField,
      operator: selectedCriteria,
      value: filterValue,
    }, groupIndex);
    onHide();
  };

  const getCriteriaOptions = () => {
    switch (selectedField) {
      case 'gender':
        return ['equals to', 'not equals to'];
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
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white rounded-lg p-6 shadow-lg z-10 w-4/12 max-w-md mx-auto">
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
                      if (!showInputForCriteria(e.target.value) && selectedField !== 'gender') {
                        setValue('');
                      }
                    }}
                  />
                  <label className="text-sm">{criteria}</label>
                </div>
                {selectedCriteria === criteria && (
                  selectedField === 'gender' ? (
                    <select
                      className=" w-full p-2 border bg-white rounded mt-1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    >
                      {selectedCriteria === 'equals to ' ? (
                    <>
                      <option value=""></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      </>
                    ):
                      (
                        <>
                          <option value=""></option>
                          <option value="female"> Male</option>
                          <option value="male">Female</option>
                        </>
                      )}
                    </select>
                  ) : showInputForCriteria(criteria) && (
                    <input
                      type={getInputType()}
                      className="form-input w-full p-2 border ml-4 rounded mt-1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter value..."
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
    
          <button className="bg-blue-500 w-11/12 mr-3 text-white px-3 py-1 rounded" onClick={handleApplyFilter}>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}