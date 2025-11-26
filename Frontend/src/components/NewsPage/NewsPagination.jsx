import React from 'react'

const NewsPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage = 6 
}) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      
      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) {
          pages.push('...')
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <nav className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === 1
              ? 'text-ink-primary/30 cursor-not-allowed'
              : 'text-ink-primary hover:bg-app-surface hover:text-ink-primary'
          }`}
        >
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-brand text-white shadow-sm shadow-brand/40'
                  : page === '...'
                  ? 'text-ink-primary/30 cursor-default'
                  : 'text-ink-primary hover:bg-app-surface hover:text-ink-primary'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? 'text-ink-primary/30 cursor-not-allowed'
              : 'text-ink-primary hover:bg-app-surface hover:text-ink-primary'
          }`}
        >
          Next
        </button>
      </nav>

      {/* Page info */}
      <div className="ml-4 text-sm text-ink-primary">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

export default NewsPagination
