import React from 'react';

const SearchFilters = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.checked });
  };

  const handleRatingChange = (e) => {
    onFilterChange({ minRating: parseInt(e.target.value) });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>
      
      <div className="space-y-6">
        {/* Availability Filter */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={filters.available}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="available" className="ml-2 text-gray-700">
              Show only available
            </label>
          </div>
        </div>
        
        {/* Rating Filter */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Minimum Rating</h4>
          <select
            value={filters.minRating}
            onChange={handleRatingChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Any rating</option>
            <option value="4">4+ stars</option>
            <option value="3">3+ stars</option>
            <option value="2">2+ stars</option>
          </select>
        </div>
        
        {/* Specialties Filter */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Specialties</h4>
          <div className="space-y-2">
            {['Cardiology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics'].map((spec) => (
              <div key={spec} className="flex items-center">
                <input
                  type="checkbox"
                  id={`spec-${spec.toLowerCase()}`}
                  name={`spec-${spec.toLowerCase()}`}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`spec-${spec.toLowerCase()}`} className="ml-2 text-gray-700">
                  {spec}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reset Filters */}
        <button
          onClick={() => onFilterChange({
            available: false,
            minRating: 0
          })}
          className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
