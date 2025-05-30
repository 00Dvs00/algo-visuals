import React from 'react';

const VisualNode = ({ value, showArrow = true, highlight = false, label }) => {
  return (
    <div className="flex items-center m-1">
      <div>
        {label && (
          <div className="text-xs text-center mb-1 font-semibold text-blue-600">
            {label}
          </div>
        )}
        <div 
          className={`
            w-12 h-12 border-2 flex items-center justify-center rounded-lg font-bold
            transition-all duration-300 ease-in-out
            ${highlight 
              ? 'border-red-500 bg-red-50 text-red-700 shadow-lg transform scale-105' 
              : 'border-gray-700 bg-white text-gray-800 hover:shadow-md'
            }
          `}
        >
          {value}
        </div>
      </div>
      {showArrow && (
        <div className="relative mx-2">
          <div className="w-8 h-0.5 bg-gray-700"></div>
          <div className="absolute right-0 top-0 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-700 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default VisualNode;
