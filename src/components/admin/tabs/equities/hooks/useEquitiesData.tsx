
import React, { useState } from 'react';
import { toast } from "sonner";
import { marketDataAPI } from '@/services/api';
import { useMarketData } from '@/contexts/MarketDataContext';
import { EquitiesDataPoint, ProcessedEquitiesData } from '../types';
import { processEquitiesData } from '../utils';

export const useEquitiesData = () => {
  const { marketData, refreshMarketData } = useMarketData();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState<EquitiesDataPoint[]>([]);
  
  // Process market data to group by date and symbol
  const processedData = React.useMemo(() => {
    return processEquitiesData(marketData.equities);
  }, [marketData.equities]);

  const handleAddDataPoint = (dataPoint: EquitiesDataPoint) => {
    setUnsavedChanges([...unsavedChanges, dataPoint]);
    toast.success(`${dataPoint.symbol} data point added. Click Save to persist changes.`);
  };

  const handleDeletePendingChange = (index: number) => {
    const newUnsavedChanges = [...unsavedChanges];
    newUnsavedChanges.splice(index, 1);
    setUnsavedChanges(newUnsavedChanges);
    toast.success("Data point removed from pending changes");
  };

  const handleDeleteExisting = async (date: string, symbol: string) => {
    try {
      setDataLoading(true);
      
      // Find the date in processed data
      const dateEntry = processedData.find(item => item.date === date);
      if (!dateEntry) return;
      
      // Create a copy of the data excluding this specific symbol
      const allData = [...processedData];
      const dateIndex = allData.findIndex(item => item.date === date);
      
      if (dateIndex >= 0) {
        const newEntry: ProcessedEquitiesData = { ...allData[dateIndex] };
        delete newEntry[symbol.toLowerCase()];
        delete newEntry[`${symbol.toLowerCase()}_change`];
        delete newEntry[`${symbol.toLowerCase()}_positive`];
        
        // Check if there are any other symbols left for this date
        const hasRemainingSymbols = Object.keys(newEntry).some(key => 
          !key.includes('_') && key !== 'date'
        );
        
        if (hasRemainingSymbols) {
          allData[dateIndex] = newEntry;
        } else {
          // Remove the entire date entry if no symbols left
          allData.splice(dateIndex, 1);
        }
      }
      
      await saveDataToAPI(allData);
      
      toast.success(`${symbol} data for ${date} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete equities data:", error);
      toast.error(`Failed to delete equities data: ${(error as Error).message}`);
    } finally {
      setDataLoading(false);
    }
  };

  const saveDataToAPI = async (allData: ProcessedEquitiesData[]) => {
    // Get all unique companies that have data
    const usedCompanies = new Set<string>();
    
    allData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (!key.includes('_') && key !== 'date') {
          usedCompanies.add(key.toUpperCase());
        }
      });
    });
    
    console.log("Companies with data:", Array.from(usedCompanies));
    console.log("Data being saved:", allData);
    
    if (usedCompanies.size === 0) {
      throw new Error("No company data to save");
    }
    
    // Format data for API
    const apiData = allData.map(item => {
      const result: any = {
        name: item.date
      };
      
      usedCompanies.forEach(symbol => {
        const symbolLower = symbol.toLowerCase();
        if (item[symbolLower] !== undefined) {
          result[symbolLower] = item[symbolLower];
          result[`${symbolLower}_change`] = item[`${symbolLower}_change`] || 0;
        }
      });
      
      return result;
    });
    
    console.log("API data formatted:", apiData);
    
    if (apiData.length === 0) {
      throw new Error("No data to save after formatting");
    }
    
    // Save via API
    await marketDataAPI.updateEquitiesData(apiData, Array.from(usedCompanies));
    
    // Refresh data
    await refreshMarketData();
  };

  const handleSaveChanges = async () => {
    if (unsavedChanges.length === 0) {
      toast.info("No changes to save");
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Process data for API
      const allData: ProcessedEquitiesData[] = [...processedData];
      
      // Update existing entries and create new ones
      unsavedChanges.forEach(change => {
        const existingDateIndex = allData.findIndex(item => item.date === change.date);
        const symbolLower = change.symbol.toLowerCase();
        
        if (existingDateIndex >= 0) {
          // Update existing date entry
          allData[existingDateIndex][symbolLower] = change.value;
          allData[existingDateIndex][`${symbolLower}_change`] = change.change_percent;
          allData[existingDateIndex][`${symbolLower}_positive`] = change.change_percent >= 0;
        } else {
          // Create new date entry
          const newEntry: ProcessedEquitiesData = { date: change.date };
          newEntry[symbolLower] = change.value;
          newEntry[`${symbolLower}_change`] = change.change_percent;
          newEntry[`${symbolLower}_positive`] = change.change_percent >= 0;
          allData.push(newEntry);
        }
      });
      
      await saveDataToAPI(allData);
      
      // Clear unsaved changes
      setUnsavedChanges([]);
      
      toast.success("Equities data saved successfully");
    } catch (error) {
      console.error("Failed to save equities data:", error);
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
