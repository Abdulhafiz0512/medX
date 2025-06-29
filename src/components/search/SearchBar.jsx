import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X } from 'react-feather';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    const params = new URLSearchParams();
    params.append('q', searchTerm.trim());
    if (location.trim()) {
      params.append('location', location.trim());
    }
    
    navigate(`/search?${params.toString()}`);
  };

  // Sample recent searches - in a real app, this would come from localStorage
  const recentSearches = [
    { id: 1, term: 'Cardiologist', type: 'specialty' },
    { id: 2, term: 'Dermatologist near me', type: 'search' },
    { id: 3, term: 'Pediatrician', type: 'specialty' },
  ];

  // Sample popular searches
  const popularSearches = [
    { id: 1, term: 'Dentist', type: 'specialty' },
    { id: 2, term: 'Eye Doctor', type: 'search' },
    { id: 3, term: 'Family Doctor', type: 'search' },
    { id: 4, term: 'Dermatology', type: 'specialty' },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex flex-col sm:flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctors, specialties, or clinics..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Location Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setIsLocationFocused(true)}
              onBlur={() => setTimeout(() => setIsLocationFocused(false), 200)}
              placeholder="Location (city, zip, or address)"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoComplete="off"
            />
            {location && (
              <button
                type="button"
                onClick={() => setLocation('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Search Suggestions */}
        {searchTerm && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="py-2">
              <h3 className="px-4 py-2 text-sm font-medium text-gray-500">Recent Searches</h3>
              {recentSearches.map((search) => (
                <button
                  key={search.id}
                  type="button"
                  onClick={() => {
                    setSearchTerm(search.term);
                    // Optionally submit the form
                    // handleSearch({ preventDefault: () => {} });
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Search className="h-4 w-4 text-gray-400 mr-3" />
                  <span>{search.term}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-200">
              <h3 className="px-4 py-2 text-sm font-medium text-gray-500">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 p-2">
                {popularSearches.map((search) => (
                  <button
                    key={search.id}
                    type="button"
                    onClick={() => {
                      setSearchTerm(search.term);
                      // Optionally submit the form
                      // handleSearch({ preventDefault: () => {} });
                    }}
                    className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100"
                  >
                    {search.term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Location Suggestions */}
      {isLocationFocused && location && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="py-2">
            <button
              type="button"
              onClick={() => {
                // In a real app, this would use the browser's geolocation API
                setLocation('Current Location');
                setIsLocationFocused(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <MapPin className="h-4 w-4 text-blue-500 mr-3" />
              <span>Use my current location</span>
            </button>
            {/* Sample locations */}
            {['New York, NY', 'Brooklyn, NY', 'Manhattan, NY', 'Queens, NY']
              .filter(city => city.toLowerCase().includes(location.toLowerCase()))
              .map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setLocation(city);
                    setIsLocationFocused(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {city}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
