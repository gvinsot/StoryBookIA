import React from 'react';
import './Pagination.css';

/**
 * Pagination Component
 * Reusable pagination controls for list views
 * 
 * @param {number} currentPage - Current page number (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes
 * @param {number} itemsPerPage - Number of items per page
 * @param {number} totalItems - Total number of items
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }
    
    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const hasItems = totalItems > 0;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        {hasItems && (
          <span>
            Affichage {startIndex}-{endIndex} sur {totalItems} résultats
          </span>
        )}
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Page précédente"
        >
          <span className="pagination-icon">‹</span>
          <span className="pagination-text">Précédent</span>
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  …
                </span>
              );
            }
            
            return (
              <button
                key={page}
                className={`pagination-page-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageClick(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          className="pagination-btn pagination-next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Page suivante"
        >
          <span className="pagination-text">Suivant</span>
          <span className="pagination-icon">›</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;