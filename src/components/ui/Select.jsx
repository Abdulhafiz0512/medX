import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(({ 
  className = '', 
  options = [], 
  placeholder = 'Select an option',
  ...props 
}, ref) => {
  return (
    <div className={`relative ${className}`}>
      <select
        ref={ref}
        className={`
          appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          text-gray-900 text-sm sm:text-base
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className.includes('error') ? 'border-red-500' : ''}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
});

Select.displayName = 'Select';


