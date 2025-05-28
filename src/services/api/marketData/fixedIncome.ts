
import { fetchMarketData, updateMarketData } from './base';
import { processMarketDataForDB } from '../dataProcessors';

// Fixed Income API methods
export const fixedIncomeAPI = {
  getData: async () => {
    const data = await fetchMarketData('fixed_income');
    if (!data) return null;
    
    // Process data for UI
    const dateMap: Record<string, any> = {};
    data.forEach((item: any) => {
      const dateStr = new Date(item.date).toLocaleDateString('en-GB');
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { name: dateStr };
      }
      
      switch(item.ticker_symbol) {
        case '91-day': 
          dateMap[dateStr].yield91 = item.value; 
          dateMap[dateStr].yield91_change = item.change_percent || 0;
          break;
        case '182-day': 
          dateMap[dateStr].yield182 = item.value; 
          dateMap[dateStr].yield182_change = item.change_percent || 0;
          break;
        case '364-day': 
          dateMap[dateStr].yield364 = item.value; 
          dateMap[dateStr].yield364_change = item.change_percent || 0;
          break;
      }
    });
    
    return Object.values(dateMap);
  },
  
  updateData: async (data: any) => {
    // Transform the data to ensure we have all the ticker symbols correctly formatted
    const processedData = [...data].map(item => {
      // Add the ticker symbol explicitly for each field
      return {
        name: item.name,
        date: item.name,
        // Standard terms
        '91-day': item.yield91 || 0,
        '91-day_change': item.yield91_change || 0,
        '182-day': item.yield182 || 0,
        '182-day_change': item.yield182_change || 0,
        '364-day': item.yield364 || 0,
        '364-day_change': item.yield364_change || 0,
      };
    });
    
    return await updateMarketData('fixed_income', processedData, processMarketDataForDB);
  }
};
