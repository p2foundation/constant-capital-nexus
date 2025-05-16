
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {/* Show page numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            // Show current page, first, last, and one page before and after current page
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber === currentPage}
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              (pageNumber === 2 && currentPage > 3) ||
              (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              // Add ellipsis for skipped pages
              return <PaginationItem key={pageNumber}>...</PaginationItem>;
            }
            return null;
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)} 
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
