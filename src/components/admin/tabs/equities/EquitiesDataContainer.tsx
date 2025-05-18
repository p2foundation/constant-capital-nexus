
import React from 'react';
import TableWrapper from './data-display/TableWrapper';
import EquitiesDataTable from './EquitiesDataTable';
import SaveChangesButton from './SaveChangesButton';
import { ProcessedEquitiesData } from './types';

interface EquitiesDataContainerProps {
  processedData: ProcessedEquitiesData[];
  isLoading: boolean;
  isSaving: boolean;
  onDeleteDataPoint: (date: string, symbol: string) => void;
  onSave: () => void;
}

const EquitiesDataContainer: React.FC<EquitiesDataContainerProps> = ({ 
  processedData,
  isLoading,
  isSaving,
  onDeleteDataPoint,
  onSave
}) => {
  const saveButton = processedData.length > 0 ? (
    <SaveChangesButton 
      onClick={onSave}
      isSaving={isSaving}
      disabled={isLoading}
    />
  ) : null;

  return (
    <TableWrapper 
      title="Existing Equities Data" 
      action={saveButton}
    >
      <EquitiesDataTable 
        processedData={processedData}
        onDeleteDataPoint={onDeleteDataPoint}
        isLoading={isLoading}
      />
    </TableWrapper>
  );
};

export default EquitiesDataContainer;
