import { useState } from 'react';

/**
 * Custom hook for pagination functionality
 */
const usePagination = (pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Get paginated data
   */
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  /**
   * Calculate total pages
   */
  const getTotalPages = (dataLength) => {
    return Math.ceil(dataLength / pageSize);
  };

  /**
   * Reset to first page
   */
  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    getPaginatedData,
    getTotalPages,
    resetPage,
  };
};

export default usePagination;