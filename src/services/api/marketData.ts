
// Market Data API service
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { processMarketDataForDB } from "./dataProcessors";

// API methods for market data
export const marketDataAPI = {
  // GSE Index
  getGSEData: async () => {
    try {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'gse')
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      // Map to the format expected by the UI
      return data.map((item: any) => ({
        name: new Date(item.date).toLocaleDateString('en-GB'),
        value: item.value,
        change_percent: item.change_percent || 0
      }));
    } catch (error) {
      console.error("Error fetching GSE data:", error);
      return null;
    }
  },
  
  updateGSEData: async (data: any) => {
    try {
      const processedData = processMarketDataForDB(data, 'gse');
      
      // First delete existing data (simple approach for now)
      const { error: deleteError } = await supabase
        .from('market_data')
        .delete()
        .eq('data_type', 'gse');
      
      if (deleteError) throw deleteError;
      
      // Then insert the new data
      const { error: insertError } = await supabase
        .from('market_data')
        .insert(processedData);
      
      if (insertError) throw insertError;
      
      return data;
    } catch (error) {
      console.error("Error updating GSE data:", error);
      toast.error("Failed to update GSE data");
      throw error;
    }
  },
  
  // Fixed Income
  getFixedIncomeData: async () => {
    try {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'fixed_income')
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      // Process data for UI
      const dateMap: Record<string, any> = {};
      data.forEach((item: any) => {
        const dateStr = new Date(item.date).toLocaleDateString('en-GB');
        if (!dateMap[dateStr]) {
          dateMap[dateStr] = { name: dateStr };
        }
        
        switch(item.ticker_symbol) {
          case '91-day': dateMap[dateStr].yield91 = item.value; break;
          case '182-day': dateMap[dateStr].yield182 = item.value; break;
          case '1-year': dateMap[dateStr].yield1yr = item.value; break;
        }
      });
      
      return Object.values(dateMap);
    } catch (error) {
      console.error("Error fetching fixed income data:", error);
      return null;
    }
  },
  
  updateFixedIncomeData: async (data: any) => {
    try {
      const processedData = processMarketDataForDB(data, 'fixed_income');
      
      // First delete existing data
      const { error: deleteError } = await supabase
        .from('market_data')
        .delete()
        .eq('data_type', 'fixed_income');
      
      if (deleteError) throw deleteError;
      
      // Then insert the new data
      const { error: insertError } = await supabase
        .from('market_data')
        .insert(processedData);
      
      if (insertError) throw insertError;
      
      return data;
    } catch (error) {
      console.error("Error updating fixed income data:", error);
      toast.error("Failed to update fixed income data");
      throw error;
    }
  },
  
  // Equities
  getEquitiesData: async () => {
    try {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'equity')
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      // Process data for UI
      const dateMap: Record<string, any> = {};
      data.forEach((item: any) => {
        const dateStr = new Date(item.date).toLocaleDateString('en-GB');
        if (!dateMap[dateStr]) {
          dateMap[dateStr] = { name: dateStr };
        }
        
        switch(item.ticker_symbol) {
          case 'GCB': dateMap[dateStr].ggb = item.value; break;
          case 'SCB': dateMap[dateStr].scc = item.value; break;
          case 'ETI': dateMap[dateStr].eti = item.value; break;
        }
      });
      
      return Object.values(dateMap);
    } catch (error) {
      console.error("Error fetching equities data:", error);
      return null;
    }
  },
  
  updateEquitiesData: async (data: any) => {
    try {
      const processedData = processMarketDataForDB(data, 'equities');
      
      // First delete existing data
      const { error: deleteError } = await supabase
        .from('market_data')
        .delete()
        .eq('data_type', 'equity');
      
      if (deleteError) throw deleteError;
      
      // Then insert the new data
      const { error: insertError } = await supabase
        .from('market_data')
        .insert(processedData);
      
      if (insertError) throw insertError;
      
      return data;
    } catch (error) {
      console.error("Error updating equities data:", error);
      toast.error("Failed to update equities data");
      throw error;
    }
  },
  
  // Eurobonds
  getEurobondsData: async () => {
    try {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'eurobond')
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      // Process data for UI
      const dateMap: Record<string, any> = {};
      data.forEach((item: any) => {
        const dateStr = new Date(item.date).toLocaleDateString('en-GB');
        if (!dateMap[dateStr]) {
          dateMap[dateStr] = { name: dateStr };
        }
        
        switch(item.ticker_symbol) {
          case 'Ghana-2029': dateMap[dateStr].ghana29 = item.value; break;
          case 'Nigeria-2032': dateMap[dateStr].nigeria32 = item.value; break;
          case 'Kenya-2031': dateMap[dateStr].kenya31 = item.value; break;
        }
      });
      
      return Object.values(dateMap);
    } catch (error) {
      console.error("Error fetching eurobonds data:", error);
      return null;
    }
  },
  
  updateEurobondsData: async (data: any) => {
    try {
      const processedData = processMarketDataForDB(data, 'eurobonds');
      
      // First delete existing data
      const { error: deleteError } = await supabase
        .from('market_data')
        .delete()
        .eq('data_type', 'eurobond');
      
      if (deleteError) throw deleteError;
      
      // Then insert the new data
      const { error: insertError } = await supabase
        .from('market_data')
        .insert(processedData);
      
      if (insertError) throw insertError;
      
      return data;
    } catch (error) {
      console.error("Error updating eurobonds data:", error);
      toast.error("Failed to update eurobonds data");
      throw error;
    }
  },
  
  // FX
  getFXData: async () => {
    try {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'fx')
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      // Process data for UI
      const dateMap: Record<string, any> = {};
      data.forEach((item: any) => {
        const dateStr = new Date(item.date).toLocaleDateString('en-GB');
        if (!dateMap[dateStr]) {
          dateMap[dateStr] = { name: dateStr };
        }
        
        switch(item.ticker_symbol) {
          case 'USD': dateMap[dateStr].usd = item.value; break;
          case 'EUR': dateMap[dateStr].eur = item.value; break;
          case 'GBP': dateMap[dateStr].gbp = item.value; break;
        }
      });
      
      return Object.values(dateMap);
    } catch (error) {
      console.error("Error fetching FX data:", error);
      return null;
    }
  },
  
  updateFXData: async (data: any) => {
    try {
      const processedData = processMarketDataForDB(data, 'fx');
      
      // First delete existing data
      const { error: deleteError } = await supabase
        .from('market_data')
        .delete()
        .eq('data_type', 'fx');
      
      if (deleteError) throw deleteError;
      
      // Then insert the new data
      const { error: insertError } = await supabase
        .from('market_data')
        .insert(processedData);
      
      if (insertError) throw insertError;
      
      return data;
    } catch (error) {
      console.error("Error updating FX data:", error);
      toast.error("Failed to update FX data");
      throw error;
    }
  },
};
