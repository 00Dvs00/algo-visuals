import React from 'react';

const VisualNode = ({ value, showArrow = true, highlight = false, label, arrowDirection = 'normal' }) => {
  // arrowDirection can be 'normal' (left-to-right) or 'reverse' (right-to-left)

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
        <div className="relative mx-2"> {/* Arrow container */}
          {/* Arrow shaft */}
          <div className="w-8 h-0.5 bg-gray-700"></div>

          {/* Arrow head: Conditionally styled based on arrowDirection */}
          {arrowDirection === 'normal' ? (
            // Right-pointing arrow head (L-R)
            <div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 
                         border-r-4 border-r-gray-700 
                         border-t-4 border-b-4 border-t-transparent border-b-transparent"
            ></div>
            
          ) : (
            // Left-pointing arrow head (R-L)
            <div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 
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
