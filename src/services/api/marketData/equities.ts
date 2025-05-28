
import { fetchMarketData, updateMarketData } from './base';
import { processMarketDataForDB } from '../dataProcessors';
import { ProcessedEquitiesData } from '@/components/admin/tabs/equities/types';

// Equities API methods
export const equitiesAPI = {
  getData: async (): Promise<ProcessedEquitiesData[] | null> => {
    const data = await fetchMarketData('equity');
    if (!data) return null;
    
    // Process data for UI
    const dateMap: Record<string, ProcessedEquitiesData> = {};
    data.forEach((item: any) => {
      const dateStr = new Date(item.date).toLocaleDateString('en-GB');
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { date: dateStr };
      }
      
      if (item.ticker_symbol) {
        const symbol = item.ticker_symbol.toLowerCase();
        dateMap[dateStr][symbol] = parseFloat(item.value);
        dateMap[dateStr][`${symbol}_change`] = parseFloat(item.change_percent || '0');
        // Add a flag to help with UI rendering
        dateMap[dateStr][`${symbol}_positive`] = parseFloat(item.change_percent || '0') >= 0;
      }
    });
    
    // Convert to array and sort by date (newest first)
    return Object.values(dateMap).sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  },
  
  updateData: async (data: any, selectedCompanies?: string[]) => {
    try {
      console.log("Equities API: Processing equities data for update:", data);
      if (!data || data.length === 0) {
        throw new Error("No data provided for update");
      }
      
      // Ensure we have data for at least one company
      const hasCompanyData = data.some((item: any) => {
        return Object.keys(item).some(key => 
          !["name", "date"].includes(key) && 
          !key.includes("_change") && 
          !key.includes("_positive")
        );
      });
      
      if (!hasCompanyData) {
        throw new Error("No valid company data found to update");
      }
      
      console.log("Calling updateMarketData with processed data");
      // Pass the selected companies to the processor
      const result = await updateMarketData('equity', data, 
        (data, type) => processMarketDataForDB(data, 'equities', selectedCompanies)
      );
      
      console.log("Equities API: Update result:", result);
      return result;
    } catch (error) {
      console.error("Failed to update equities data:", error);
      throw error;
    }
  }
};
