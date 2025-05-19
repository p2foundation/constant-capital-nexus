
import React, { useState } from 'react';
import { useMarketData } from '@/contexts/MarketDataContext';
import { ProcessedEquitiesData } from '../types';
import { processEquitiesData } from '../utils';
import { usePendingChanges } from './usePendingChanges';
import { saveDataToAPI } from './useEquitiesApi';
import { prepareDataForSaving, prepareDataForDeletion } from './useEquitiesDataTransformers';

export const useEquitiesData = () => {
  const { marketData, refreshMarketData } = useMarketData();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const { 
    unsavedChanges, 
    handleAddDataPoint, 
    handleDeletePendingChange,
    clearUnsavedChanges
  } = usePendingChanges();
  
  // Process market data to group by date and symbol
  const processedData = React.useMemo(() => {
    return processEquitiesData(marketData.equities);
  }, [marketData.equities]);

  const handleDeleteExisting = async (date: string, symbol: string) => {
    try {
      setDataLoading(true);
      console.log(`Deleting existing data point: ${symbol} for ${date}`);
      
      // Prepare data for deletion
      const updatedData = prepareDataForDeletion(processedData, date, symbol);
      
      const result = await saveDataToAPI(updatedData);
      console.log("Delete operation result:", result);
      
      // Refresh data after successful deletion
      await refreshMarketData();
      
      // Show success notification
      const toast = await import("sonner").then(module => module.toast);
      toast.success(`${symbol} data for ${date} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete equities data:", error);
      const toast = await import("sonner").then(module => module.toast);
      toast.error(`Failed to delete equities data: ${(error as Error).message}`);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (unsavedChanges.length === 0) {
      const toast = await import("sonner").then(module => module.toast);
      toast.info("No changes to save");
      return;
    }
    
    try {
      setIsSaving(true);
      console.log("Starting to save changes...");
      
      // Prepare data for saving
      const allData = prepareDataForSaving(processedData, unsavedChanges);
      
      console.log("Processed data for saving:", allData);
      const result = await saveDataToAPI(allData);
      console.log("Save operation result:", result);
      
      // Refresh data after successful save
      await refreshMarketData();
      
      // Clear unsaved changes
      clearUnsavedChanges();
      
      console.log("Save completed successfully");
    } catch (error) {
      console.error("Failed to save equities data:", error);
      const toast = await import("sonner").then(module => module.toast);
      toast.error(`Failed to save equities data: ${(error as Error).message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    processedData,
    unsavedChanges,
    isSaving,
    dataLoading,
    handleAddDataPoint,
    handleDeletePendingChange,
    handleDeleteExisting,
    handleSaveChanges
  };
};
