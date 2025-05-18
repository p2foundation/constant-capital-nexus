
import React from 'react';
import EquitiesDataForm from './equities/EquitiesDataForm';
import EquitiesDataContainer from './equities/EquitiesDataContainer';
import UnsavedChanges from './equities/UnsavedChanges';
import SaveChangesButton from './equities/SaveChangesButton';
import { useEquitiesData } from './equities/hooks/useEquitiesData';

const EquitiesTab: React.FC = () => {
  const {
    processedData,
    unsavedChanges,
    isSaving,
    dataLoading,
    handleAddDataPoint,
    handleDeletePendingChange,
    handleDeleteExisting,
    handleSaveChanges
  } = useEquitiesData();

  return (
    <div className="space-y-6">
      <EquitiesDataForm onAddDataPoint={handleAddDataPoint} />
      
      {unsavedChanges.length > 0 && (
        <div className="space-y-4">
          <UnsavedChanges 
            unsavedChanges={unsavedChanges}
            onDelete={handleDeletePendingChange}
          />
          
          <div className="flex justify-end">
            <SaveChangesButton 
              onClick={handleSaveChanges}
              isSaving={isSaving}
            />
          </div>
        </div>
      )}
      
      <EquitiesDataContainer 
        processedData={processedData}
        isLoading={dataLoading}
        isSaving={isSaving}
        onDeleteDataPoint={handleDeleteExisting}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default EquitiesTab;
