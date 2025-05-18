
import React from 'react';
import { Table } from "@/components/ui/table";
import { ProcessedEquitiesData } from './types';
import LoadingState from './data-display/LoadingState';
import EmptyState from './data-display/EmptyState';
import EquitiesTableHeader from './data-display/TableHeader';
import EquitiesTableBody from './data-display/EquitiesTableBody';

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
  if (isLoading) {
    return <LoadingState />;
  }

  if (processedData.length === 0) {
    return <EmptyState message="No equities data available. Add some data points to get started." />;
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <Table>
        <EquitiesTableHeader />
        <EquitiesTableBody 
          processedData={processedData}
          onDeleteDataPoint={onDeleteDataPoint}
        />
      </Table>
    </div>
  );
};

export default EquitiesDataTable;
