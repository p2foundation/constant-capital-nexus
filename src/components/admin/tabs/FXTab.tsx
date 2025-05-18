
import React from 'react';
import MarketDataEditor from '../MarketDataEditor';
import { marketDataAPI } from '@/services/api';
import { fxData } from '@/components/market-data/mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';
import { toast } from 'sonner';

const FXTab: React.FC = () => {
  const { marketData, refreshMarketData } = useMarketData();
  
  // Format FX data for the editor
  const formattedData = marketData.fx.length > 0 ? 
    [...new Set(marketData.fx.map(item => item.date))].map(date => {
      const dateItems = marketData.fx.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB'),
        usd: dateItems.find(i => i.ticker_symbol === 'USD')?.value || 0,
        usd_change: dateItems.find(i => i.ticker_symbol === 'USD')?.change_percent || 0,
        usd_positive: (dateItems.find(i => i.ticker_symbol === 'USD')?.change_percent || 0) >= 0,
        eur: dateItems.find(i => i.ticker_symbol === 'EUR')?.value || 0,
        eur_change: dateItems.find(i => i.ticker_symbol === 'EUR')?.change_percent || 0,
        eur_positive: (dateItems.find(i => i.ticker_symbol === 'EUR')?.change_percent || 0) >= 0,
        gbp: dateItems.find(i => i.ticker_symbol === 'GBP')?.value || 0,
        gbp_change: dateItems.find(i => i.ticker_symbol === 'GBP')?.change_percent || 0,
        gbp_positive: (dateItems.find(i => i.ticker_symbol === 'GBP')?.change_percent || 0) >= 0
      };
    }) : 
    fxData.map(item => ({
      ...item,
      usd_change: 0,
      usd_positive: true,
      eur_change: 0,
      eur_positive: true,
      gbp_change: 0,
      gbp_positive: true
    }));

  return (
    <MarketDataEditor
      title="FX Rates"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'usd', label: 'USD/GHS', type: 'number' },
        { name: 'usd_change', label: 'USD/GHS Change %', type: 'number' },
        { name: 'usd_positive', label: 'USD Change Direction', type: 'hidden' },
        { name: 'eur', label: 'EUR/GHS', type: 'number' },
        { name: 'eur_change', label: 'EUR/GHS Change %', type: 'number' },
        { name: 'eur_positive', label: 'EUR Change Direction', type: 'hidden' },
        { name: 'gbp', label: 'GBP/GHS', type: 'number' },
        { name: 'gbp_change', label: 'GBP/GHS Change %', type: 'number' },
        { name: 'gbp_positive', label: 'GBP Change Direction', type: 'hidden' }
      ]}
      fetchFn={async () => {
        if (marketData.fx.length > 0) {
          return formattedData;
        }
        return marketDataAPI.getFXData().then(data => data || fxData);
      }}
      updateFn={async (data) => {
        try {
          console.log("FX Tab - Data to update:", data);
          
          // Data validation
          if (!data || !Array.isArray(data) || data.length === 0) {
            toast.error("No valid FX data to save");
            return formattedData;
          }
          
          // Check for required data
          const hasInvalidData = data.some(item => 
            !item.name || 
            (isNaN(Number(item.usd)) && isNaN(Number(item.eur)) && isNaN(Number(item.gbp)))
          );
          
          if (hasInvalidData) {
            toast.error("Invalid FX data detected. Please check your inputs.");
            return formattedData;
          }
          
          await marketDataAPI.updateFXData(data);
          await refreshMarketData();
          toast.success("FX data updated successfully");
          return data;
        } catch (error) {
          console.error("Error updating FX data:", error);
          toast.error("Failed to update FX data: " + (error instanceof Error ? error.message : "Unknown error"));
          return formattedData;
        }
      }}
      showDatePicker={true}
      showChangeColors={true}
    />
  );
};

export default FXTab;
