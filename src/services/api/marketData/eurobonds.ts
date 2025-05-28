
import { fetchMarketData, updateMarketData } from './base';
import { processMarketDataForDB } from '../dataProcessors';
import { toast } from "sonner";

// Eurobonds API methods
export const eurobondsAPI = {
  getData: async () => {
    const data = await fetchMarketData('eurobond');
    if (!data) return null;
    
    // Process data for UI
    const dateMap: Record<string, any> = {};
    data.forEach((item: any) => {
      const dateStr = new Date(item.date).toLocaleDateString('en-GB');
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { name: dateStr };
      }
      
      switch(item.ticker_symbol) {
        case 'Ghana-2029': 
          dateMap[dateStr].ghana29 = item.value;
          dateMap[dateStr].ghana29_change = item.change_percent || 0;
          break;
        case 'Nigeria-2032': 
          dateMap[dateStr].nigeria32 = item.value;
          dateMap[dateStr].nigeria32_change = item.change_percent || 0;
          break;
        case 'Kenya-2031': 
          dateMap[dateStr].kenya31 = item.value;
          dateMap[dateStr].kenya31_change = item.change_percent || 0;
          break;
        case 'Ghana-2030':
          dateMap[dateStr].ghana30 = item.value;
          dateMap[dateStr].ghana30_change = item.change_percent || 0;
          break;
      }
    });
    
    return Object.values(dateMap);
  },
  
  updateData: async (data: any) => {
    try {
      console.log("Eurobonds data to be processed:", data);
      
      // Transform the data to ensure we have all the ticker symbols correctly formatted
      const processedData = [...data].map(item => {
        // Validate data before processing
        if (!item.name || typeof item.name !== 'string') {
          console.error('Invalid Eurobond data item: missing or invalid name', item);
          throw new Error('Invalid data format: missing date');
        }
        
        // Convert the date string to a proper ISO format for database storage
        // Parse the date in DD/MM/YYYY format and convert to YYYY-MM-DD
        let formattedDate = item.name;
        
        // Check if the date is in DD/MM/YYYY format
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(item.name)) {
          const [day, month, year] = item.name.split('/');
          formattedDate = `${year}-${month}-${day}`;
        }
        
        console.log(`Converted date from ${item.name} to ${formattedDate}`);
        
        // Add the ticker symbol explicitly for each field
        return {
          name: item.name,
          date: formattedDate,
          // Add explicit ticker symbols
          'Ghana-2029': item.ghana29 || 0,
          'Ghana-2029_change': item.ghana29_change || 0,
          'Nigeria-2032': item.nigeria32 || 0,
          'Nigeria-2032_change': item.nigeria32_change || 0,
          'Kenya-2031': item.kenya31 || 0,
          'Kenya-2031_change': item.kenya31_change || 0,
          'Ghana-2030': item.ghana30 || 0,
          'Ghana-2030_change': item.ghana30_change || 0
        };
      });
      
      console.log("Processed Eurobond data for update:", processedData);
      const result = await updateMarketData('eurobond', processedData, processMarketDataForDB);
      
      // Display success toast notification
      toast.success("Eurobonds data updated successfully");
      
      return result;
    } catch (error) {
      console.error("Error updating Eurobond data:", error);
      // Display error toast notification
      toast.error(`Failed to update Eurobonds data: ${(error as Error).message}`);
      throw error;
    }
  }
};
