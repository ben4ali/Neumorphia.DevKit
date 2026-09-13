import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface NeumorphicPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const NeumorphicPagination: React.FC<NeumorphicPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`inline-flex items-center gap-2 select-none ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-neo-control flex items-center justify-center bg-neo-surface text-neo-primary/80 shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm border border-neo-border disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {getPages().map((page, idx) => {
        if (typeof page === 'string') {
          return (
            <span key={`ellipsis-${idx}`} className="w-8 text-center text-xs font-mono text-neo-primary/40">
              •••
            </span>
          );
        }

        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            className={`w-9 h-9 rounded-neo-control text-xs font-bold font-mono transition-all border outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
              isActive
                ? 'shadow-neo-inset-sm bg-neo-well/50 text-neo-secondary border-neo-border'
                : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/80 hover:text-neo-primary hover:shadow-neo-raised-md border-neo-border'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-neo-control flex items-center justify-center bg-neo-surface text-neo-primary/80 shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm border border-neo-border disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
