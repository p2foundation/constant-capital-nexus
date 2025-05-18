
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface MarketDataItem {
  date: string;
  value: number;
  change_percent?: number;
  [key: string]: any;
}

// Generic function to fetch market data by type
export const fetchMarketData = async (dataType: string) => {
  try {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('data_type', dataType)
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching ${dataType} data:`, error);
    toast.error(`Failed to fetch ${dataType} data: ${(error as Error).message}`);
    return null;
  }
};

// Generic function to update market data
export const updateMarketData = async (
  dataType: string, 
  data: any[], 
  processFunction: (data: any[], type: string, selectedItems?: string[]) => any[]
) => {
  try {
    // Process and validate the data
    const processedData = processFunction(data, dataType);
    
    if (!processedData || processedData.length === 0) {
      throw new Error('No valid data to update');
    }
    
    // First delete existing data if needed
    // For some data types like equities, we might not want to delete all records
    // but for others like GSE or FX, we might clear all previous entries
    let deleteError;
    
    // If we're updating specific items (like specific equity symbols)
    // we may not want to delete all records first
    const skipDelete = dataType === 'equity' && processedData.length > 0 && 
                       processedData.some((item: any) => item.ticker_symbol);
    
    if (!skipDelete) {
      const { error } = await supabase
        .from('market_data')
        .delete()
        .eq('data_type', dataType);
      
      deleteError = error;
    }
    
    if (deleteError) throw deleteError;
    
    // Then insert the new data
    const { error: insertError } = await supabase
      .from('market_data')
      .insert(processedData);
    
    if (insertError) throw insertError;
    
    toast.success(`${dataType} data updated successfully`);
    return data;
  } catch (error) {
    console.error(`Error updating ${dataType} data:`, error);
    toast.error(`Failed to update ${dataType} data: ${(error as Error).message}`);
    throw error;
  }
};
