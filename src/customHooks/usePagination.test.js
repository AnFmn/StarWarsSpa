import { renderHook, act } from '@testing-library/react';
import usePagination from './usePagination';

describe('usePagination', () => {
  const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  it('should paginate data correctly', () => {
    const { result } = renderHook(() => usePagination(testData, 3));

    expect(result.current.paginatedData).toEqual([1, 2, 3]);

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.paginatedData).toEqual([4, 5, 6]);

    act(() => {
      result.current.handlePageChange(3);
    });

    expect(result.current.paginatedData).toEqual([7, 8, 9]);
  });

  it('should handle page change', () => {
    const { result } = renderHook(() => usePagination(testData, 3));

    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.handlePageChange(3);
    });

    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.handlePageChange(-1);
    });

    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.handlePageChange(8);
    });

    expect(result.current.currentPage).toBe(3);
  });
});
