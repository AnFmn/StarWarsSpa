import { useState, useEffect } from 'react';
import { PaginationResult } from '../intefaces/interfaces';

const usePagination = <T>(
  data: T[],
  itemsPerPage: number,
  initialPage: number = 1,
): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { paginatedData, currentPage, handlePageChange };
};

export default usePagination;
