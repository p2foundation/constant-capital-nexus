
import React, { useEffect } from 'react';
import EquitiesDataForm from './equities/EquitiesDataForm';
import EquitiesDataContainer from './equities/EquitiesDataContainer';
import UnsavedChanges from './equities/UnsavedChanges';
import SaveChangesButton from './equities/SaveChangesButton';
import { useEquitiesData } from './equities/hooks/useEquitiesData';
import { toast } from "sonner";

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
  
  console.log("EquitiesTab rendering with:", {
    dataCount: processedData.length,
    unsavedCount: unsavedChanges.length,
    isSaving,
    dataLoading
  });

  // Log when save is triggered
  useEffect(() => {
    if (isSaving) {
      console.log("Save operation in progress...");
    }
  }, [isSaving]);

  // Handle save button click
  const onSaveChangesClick = () => {
    console.log("Save changes button clicked, unsaved changes:", unsavedChanges.length);
    if (unsavedChanges.length === 0) {
      toast.info("No changes to save");
      return;
    }
    
    try {
      handleSaveChanges();
    } catch (error) {
      console.error("Error in save changes handler:", error);
      toast.error(`Error saving changes: ${(error as Error).message}`);
    }
  };

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
              onClick={onSaveChangesClick}
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
        onSave={onSaveChangesClick}
      />
    </div>
  );
};

export default EquitiesTab;
