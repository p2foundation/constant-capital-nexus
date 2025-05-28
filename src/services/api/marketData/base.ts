
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface MarketDataItem {
  date: string;
  value: number;
  change_percent?: number;
  [key: string]: any;
}

// Helper function to convert DD/MM/YYYY to YYYY-MM-DD
const formatDateForDB = (dateStr: string): string => {
  if (!dateStr) return dateStr;
  
  try {
    // Check if already in ISO format
    if (dateStr.includes('-')) {
      return dateStr;
    }
    
    // Convert DD/MM/YYYY to YYYY-MM-DD
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  } catch (error) {
    console.error("Date formatting error in API:", error);
    return dateStr;
  }
};

// Generic function to fetch market data by type
export const fetchMarketData = async (dataType: string) => {
  try {
    console.log(`Fetching ${dataType} data from database`);
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('data_type', dataType as any) // Using type assertion to fix TypeScript error
      .order('date', { ascending: true });
    
    if (error) {
      console.error(`Error in fetchMarketData for ${dataType}:`, error);
      throw error;
    }
    
    console.log(`Got ${data?.length || 0} ${dataType} records from database`);
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
    console.log(`Updating ${dataType} data, received ${data.length} records`);
    
    // Ensure dates are in the correct format for the database
    const formattedData = data.map(item => {
      if (item.date) {
        return {
          ...item,
          date: formatDateForDB(item.date)
        };
      }
      return item;
    });
    
    console.log("Data after date formatting:", formattedData);
    
    // Process and validate the data
    const processedData = processFunction(formattedData, dataType);
    
    if (!processedData || processedData.length === 0) {
      console.error("No valid data to update after processing");
      throw new Error('No valid data to update');
    }
    
    console.log(`Processed ${processedData.length} records for database update`);
    
    // For equity data, we need special handling for the ticker symbols
    if (dataType === 'equity' || dataType === 'equities') {
      // Get unique ticker symbols in the new data
      const tickerSymbols = [...new Set(processedData.map((item: any) => item.ticker_symbol))];
      
      // Get unique dates in the new data
      const dates = [...new Set(processedData.map((item: any) => item.date))];
      
      console.log("Updating data for tickers:", tickerSymbols);
      console.log("Updating data for dates:", dates);
      
      // Delete existing data for these tickers and dates only
      if (tickerSymbols.length > 0 && dates.length > 0) {
        console.log("Deleting existing data for these tickers and dates");
        const { error: deleteError } = await supabase
          .from('market_data')
          .delete()
          .eq('data_type', 'equity' as any) // Using type assertion to fix TypeScript error
          .in('ticker_symbol', tickerSymbols)
          .in('date', dates);
        
        if (deleteError) {
          console.error("Error deleting existing equity data:", deleteError);
          throw deleteError;
        }
      }
    } else {
      // For other data types, we can delete all existing data
      console.log(`Deleting all existing ${dataType} data`);
      const { error: deleteError } = await supabase
        .from('market_data')
        .delete()
        .eq('data_type', dataType as any); // Using type assertion to fix TypeScript error
      
      if (deleteError) {
        console.error(`Error deleting existing ${dataType} data:`, deleteError);
        throw deleteError;
      }
    }
    
    // Insert the new data
    console.log("Inserting new data:", processedData.length, "records");
    const { data: insertedData, error: insertError } = await supabase
      .from('market_data')
      .insert(processedData)
      .select();
    
    if (insertError) {
      console.error(`Error inserting ${dataType} data:`, insertError);
      throw insertError;
    }
    
    console.log(`${dataType} data updated successfully with ${processedData.length} records`);
    return insertedData || data;
  } catch (error) {
    console.error(`Error updating ${dataType} data:`, error);
    // Don't show toast here as it's handled by the calling function
    throw error;
  }
};
