
import { toast } from "sonner";
import { marketDataAPI } from '@/services/api';
import { ProcessedEquitiesData } from '../types';

/**
 * Handles data saving to the API with error handling and notifications
 */
export const saveDataToAPI = async (allData: ProcessedEquitiesData[]): Promise<any> => {
  try {
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
    
    // Ensure change percentages have correct signs
    allData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key.includes('_change')) {
          const baseField = key.replace('_change', '');
          // Store the actual change value, not just its sign
          // The positive/negative sign will be determined by the actual value
          item[`${baseField}_positive`] = Number(item[key]) >= 0;
        }
      });
    });
    
    // Call the API to save the data
    console.log("Calling updateEquitiesData with:", allData, Array.from(usedCompanies));
    const response = await marketDataAPI.updateEquitiesData(allData, Array.from(usedCompanies));
    console.log("API response:", response);
    
    // Ensure toast is visible after saving
    toast.success("Equities data saved successfully!");
    
    return response;
  } catch (error) {
    console.error("Error in saveDataToAPI:", error);
    toast.error(`Failed to save equities data: ${(error as Error).message}`);
    throw error;
  }
};
