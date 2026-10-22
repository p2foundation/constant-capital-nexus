
import { fetchMarketData, updateMarketData } from './base';
import { processMarketDataForDB } from '../dataProcessors';

// GSE Index API methods
export const gseAPI = {
  getData: async () => {
    const data = await fetchMarketData('gse');
    if (!data) return null;
    
    // Map to the format expected by the UI
    return data.map((item: any) => ({
      name: new Date(item.date).toLocaleDateString('en-GB'),
      value: item.value,
      change_percent: item.change_percent || 0
    }));
  },
  
  updateData: async (data: any) => {
    const records = data.map((item: any) => ({ ...item, date: item.date || item.name }));
    return await updateMarketData('gse', records, processMarketDataForDB);
  }
};
