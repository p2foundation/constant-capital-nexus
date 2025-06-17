
import React, { useState, useMemo } from 'react';
import { Table } from "@/components/ui/table";
import { ProcessedEquitiesData } from './types';
import LoadingState from './data-display/LoadingState';
import EmptyState from './data-display/EmptyState';
import EquitiesTableHeader from './data-display/TableHeader';
import EquitiesTableBody from './data-display/EquitiesTableBody';
import PaginationControls from '../../research/PaginationControls';

interface EquitiesDataTableProps {
  processedData: ProcessedEquitiesData[];
  onDeleteDataPoint: (date: string, symbol: string) => void;
  isLoading: boolean;
}

const EquitiesDataTable: React.FC<EquitiesDataTableProps> = ({ 
  processedData, 
  onDeleteDataPoint,
  isLoading
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const { paginatedData, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = processedData.slice(startIndex, endIndex);
    const pages = Math.ceil(processedData.length / itemsPerPage);
    
    return {
      paginatedData: paginated,
      totalPages: pages
    };
  }, [processedData, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (processedData.length === 0) {
    return <EmptyState message="No equities data available. Add some data points to get started." />;
  }

  return (
    <div className="space-y-4">
      <div className="max-h-[500px] overflow-y-auto">
        <Table>
          <EquitiesTableHeader />
          <EquitiesTableBody 
            processedData={paginatedData}
            onDeleteDataPoint={onDeleteDataPoint}
          />
        </Table>
      </div>
      
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default EquitiesDataTable;
