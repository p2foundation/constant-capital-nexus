
import { fetchMarketData, updateMarketData } from './base';
import { processMarketDataForDB } from '../dataProcessors';

// FX API methods
export const fxAPI = {
  getData: async () => {
    const data = await fetchMarketData('fx');
    if (!data) return null;
    
    // Process data for UI
    const dateMap: Record<string, any> = {};
    data.forEach((item: any) => {
      const dateStr = new Date(item.date).toLocaleDateString('en-GB');
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { name: dateStr };
      }
      
      switch(item.ticker_symbol) {
        case 'USD': 
          dateMap[dateStr].usd = item.value;
          dateMap[dateStr].usd_change = item.change_percent || 0;
          break;
        case 'EUR': 
          dateMap[dateStr].eur = item.value;
          dateMap[dateStr].eur_change = item.change_percent || 0;
          break;
        case 'GBP': 
          dateMap[dateStr].gbp = item.value;
          dateMap[dateStr].gbp_change = item.change_percent || 0;
          break;
      }
    });
    
    return Object.values(dateMap);
  },
  
  updateData: async (data: any) => {
    try {
      console.log("FX data to be processed:", data);
      
      // Transform the data to ensure we have all the ticker symbols correctly formatted
      const processedData = [...data].map(item => {
        // Validate data before processing
        if (!item.name || typeof item.name !== 'string') {
          console.error('Invalid FX data item: missing or invalid name', item);
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
        
        return {
          name: item.name,
          date: formattedDate,
          USD: item.usd || 0,
          USD_change: item.usd_change || 0,
          EUR: item.eur || 0,
          EUR_change: item.eur_change || 0,
          GBP: item.gbp || 0, 
          GBP_change: item.gbp_change || 0
        };
      });
      
      console.log("Processed FX data for update:", processedData);
      return await updateMarketData('fx', processedData, processMarketDataForDB);
    } catch (error) {
      console.error("Error updating FX data:", error);
      throw error; // Re-throw to be handled by the caller
    }
  }
};
