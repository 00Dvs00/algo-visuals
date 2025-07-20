import React from 'react';

const VisualNode = ({
  value,
  showArrow = true,
  highlight = false,
  label,
  arrowDirection = 'normal',
  isNull = false
}) => {
  return (
    <div className="flex items-center m-1">
      <div className="relative">
        {label && (
          <div 
          className="
          absolute bottom-full left-1/2 -translate-x-1/2
          text-xs text-center mb-1 font-semibold text-blue-600
          w-max max-w-24">
            {label}
          </div>
        )}
        <div
          className={`
            w-12 h-12 border-2 flex items-center justify-center rounded-lg font-bold
            transition-all duration-300 ease-in-out
            ${isNull
              ? 'border-gray-400 bg-gray-100 text-gray-500'
              : highlight
              ? 'border-red-500 bg-red-50 text-red-700 shadow-lg transform scale-105'
              : 'border-gray-700 bg-white text-gray-800 hover:shadow-md'
            }
          `}
        >
          {value}
        </div>
      </div>

      {showArrow && !isNull && (
        <div className="relative mx-2">
          <div className="w-8 h-0.5 bg-gray-700"></div>
          {arrowDirection === 'reverse' ? (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 
                            border-r-4 border-r-gray-700 
                            border-t-4 border-b-4 border-t-transparent border-b-transparent"
            ></div>
          ) : (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 
                            border-l-4 border-l-gray-700 
                            border-t-4 border-b-4 border-t-transparent border-b-transparent"
            ></div>
          )}
        </div>
      )}
    </div>
  );
};


export default VisualNode;
