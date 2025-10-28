import React from 'react';

/**
 * Pagination controls component
 */
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between items-center my-4 px-5 py-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-sm text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <button
          className="px-3 py-2 border border-gray-300 bg-white text-blue-600 rounded cursor-pointer text-sm font-medium hover:bg-gray-100 hover:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 min-w-[40px] text-center transition-colors"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="px-3 py-2 border border-gray-300 bg-white text-blue-600 rounded cursor-pointer text-sm font-medium hover:bg-gray-100 hover:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 min-w-[40px] text-center transition-colors"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {startPage > 1 && (
          <>
            <button 
              className="px-3 py-2 border border-gray-300 bg-white text-blue-600 rounded cursor-pointer text-sm font-medium hover:bg-gray-100 hover:border-gray-400 min-w-[40px] text-center transition-colors"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        
        {pageNumbers.map(pageNum => (
          <button
            key={pageNum}
            className={`px-3 py-2 border rounded cursor-pointer text-sm font-medium min-w-[40px] text-center transition-colors ${
              currentPage === pageNum
                ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700'
                : 'border-gray-300 bg-white text-blue-600 hover:bg-gray-100 hover:border-gray-400'
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button 
              className="px-3 py-2 border border-gray-300 bg-white text-blue-600 rounded cursor-pointer text-sm font-medium hover:bg-gray-100 hover:border-gray-400 min-w-[40px] text-center transition-colors"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          className="px-3 py-2 border border-gray-300 bg-white text-blue-600 rounded cursor-pointer text-sm font-medium hover:bg-gray-100 hover:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 min-w-[40px] text-center transition-colors"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="px-3 py-2 border border-gray-300 bg-white text-blue-600 rounded cursor-pointer text-sm font-medium hover:bg-gray-100 hover:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 min-w-[40px] text-center transition-colors"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;