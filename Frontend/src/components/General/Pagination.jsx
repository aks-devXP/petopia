// import { MoveRight } from 'lucide-react';
import { MoveLeft, MoveRight } from 'lucide-react';
import React from 'react';
const Pagination = ({ 
  start, 
  end, 
  PageChangeHandler, 
  currentPage = 1,
  showPrevNext = true,
  maxVisiblePages = 5 
}) => {
  let endPage = end;
  let startPage = start;
  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = end;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    } else {
      // Complex logic for ellipsis
      const halfVisible = Math.floor(maxVisiblePages / 2);
      startPage = Math.max(start, currentPage - halfVisible);
      endPage = Math.min(end, currentPage + halfVisible);
      
      // Adjust if we're near the beginning or end
      if (endPage - startPage < maxVisiblePages - 1) {
        if (startPage === start) {
          endPage = Math.min(end, startPage + maxVisiblePages - 1);
        } else {
          startPage = Math.max(start, endPage - maxVisiblePages + 1);
        }
      }
      
      // Add first page and ellipsis if needed
      if (startPage > start) {
        pages.push(start);
        if (startPage > start + 1) {
          pages.push('...');
        }
      }
      
      // Add visible pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add last page and ellipsis if needed
      if (endPage < end) {
        if (endPage < end - 1) {
          pages.push('...');
        }
        pages.push(end);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageChange = (page) => {
    if (page !== '...' && page >= start && page <= end && page !== currentPage) {
      PageChangeHandler(page);
    }
  };

  return (
    <div className='w-full h-auto flex justify-center items-center my-4'>
      <div className='flex items-center gap-1'>
        {/* Previous Button */}
        {start!=currentPage && startPage!=start && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === start}
            className={`
              px-3 py-2 rounded-md border transition-colors duration-200
              ${currentPage === start
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <MoveLeft/>
          </button>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          <button
            key={`${pageNum}-${index}`}
            onClick={() => handlePageChange(pageNum)}
            disabled={pageNum === '...'}
            className={`
              px-3 py-2 rounded-md border transition-colors duration-200 min-w-[40px]
              ${pageNum === '...'
                ? 'bg-transparent text-gray-400 border-transparent cursor-default'
                : currentPage === pageNum 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        {end!=endPage && currentPage!==end&& (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === end}
            className={`
              px-3 py-2 rounded-md border transition-colors duration-200
              ${currentPage === end
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <MoveRight/>
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
