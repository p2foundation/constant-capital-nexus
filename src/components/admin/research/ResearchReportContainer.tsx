
import React, { useState, useEffect } from 'react';
import { ResearchReport } from '@/types/supabase';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import ResearchReportsList from './ResearchReportsList';
import SearchBar from './SearchBar';

interface ResearchReportContainerProps {
  reports: ResearchReport[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  isFiltering: boolean;
  setIsFiltering: (filtering: boolean) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  handleEditReport: (report: ResearchReport) => void;
  handleDeleteReport: (id: string) => void;
  handleRetry: () => void;
  formatDate: (date: string) => string;
}

const ResearchReportContainer: React.FC<ResearchReportContainerProps> = ({
  reports,
  isLoading,
  error,
  totalPages,
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  isFiltering,
  setIsFiltering,
  handleSearchSubmit,
  handleEditReport,
  handleDeleteReport,
  handleRetry,
  formatDate,
}) => {
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1); // Reset to first page when filtering
    setIsFiltering(value !== "all");
  };

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />
      
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message="Failed to load reports" onRetry={handleRetry} />
      ) : (
        <ResearchReportsList
          reports={reports}
          onEdit={handleEditReport}
          onDelete={handleDeleteReport}
          formatDate={formatDate}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onFilterChange={handleFilterChange}
          currentFilter={filterType}
          isFiltering={isFiltering}
        />
      )}
    </>
  );
};

export default ResearchReportContainer;
