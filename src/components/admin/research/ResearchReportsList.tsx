
import React from 'react';
import { ResearchReport } from '@/types/supabase';
import TypeFilter from './TypeFilter';
import ReportsTable from './ReportsTable';
import PaginationControls from './PaginationControls';

interface ResearchReportsListProps {
  reports: ResearchReport[];
  onEdit: (report: ResearchReport) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange?: (filter: string) => void;
  currentFilter?: string;
  isFiltering?: boolean;
}

const ResearchReportsList = ({
  reports,
  onEdit,
  onDelete,
  formatDate,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
  currentFilter = "all",
  isFiltering = false,
}: ResearchReportsListProps) => {
  return (
    <div className="flex flex-col">
      {/* Report type filter */}
      {onFilterChange && (
        <TypeFilter 
          currentFilter={currentFilter} 
          onFilterChange={onFilterChange} 
        />
      )}
      
      {/* Reports table */}
      <ReportsTable
        reports={reports}
        onEdit={onEdit}
        onDelete={onDelete}
        formatDate={formatDate}
        isFiltering={isFiltering}
      />
      
      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ResearchReportsList;
