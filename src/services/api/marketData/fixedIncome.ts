
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
        case '1-year': 
          dateMap[dateStr].yield1yr = item.value; 
          dateMap[dateStr].yield1yr_change = item.change_percent || 0;
          break;
        case '3-year': 
          dateMap[dateStr].yield3yr = item.value; 
          dateMap[dateStr].yield3yr_change = item.change_percent || 0;
          break;
        case '5-year': 
          dateMap[dateStr].yield5yr = item.value; 
          dateMap[dateStr].yield5yr_change = item.change_percent || 0;
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
        '1-year': item.yield1yr || 0,
        '1-year_change': item.yield1yr_change || 0,
        // Additional terms if present
        '3-year': item.yield3yr || 0,
        '3-year_change': item.yield3yr_change || 0,
        '5-year': item.yield5yr || 0,
        '5-year_change': item.yield5yr_change || 0,
        '364-day': item.yield364 || 0,
        '364-day_change': item.yield364_change || 0,
      };
    });
    
    return await updateMarketData('fixed_income', processedData, processMarketDataForDB);
  }
};
