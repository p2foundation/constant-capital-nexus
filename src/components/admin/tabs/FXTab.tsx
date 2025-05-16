
import React from 'react';
import MarketDataEditor from '../MarketDataEditor';
import { marketDataAPI } from '@/services/api';
import { fxData } from '@/components/market-data/mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const FXTab: React.FC = () => {
  const { marketData, refreshMarketData } = useMarketData();
  
  // Format FX data for the editor
  const formattedData = marketData.fx.length > 0 ? 
    [...new Set(marketData.fx.map(item => item.date))].map(date => {
      const dateItems = marketData.fx.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB'),
        usd: dateItems.find(i => i.ticker_symbol === 'USD')?.value || 0,
        eur: dateItems.find(i => i.ticker_symbol === 'EUR')?.value || 0,
        gbp: dateItems.find(i => i.ticker_symbol === 'GBP')?.value || 0
      };
    }) : 
    fxData;

  return (
    <MarketDataEditor
      title="FX Rates"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'usd', label: 'USD/GHS', type: 'number' },
        { name: 'eur', label: 'EUR/GHS', type: 'number' },
        { name: 'gbp', label: 'GBP/GHS', type: 'number' }
      ]}
      fetchFn={async () => {
        if (marketData.fx.length > 0) {
          return formattedData;
        }
        return marketDataAPI.getFXData().then(data => data || fxData);
      }}
      updateFn={async (data) => {
        await marketDataAPI.updateFXData(data);
        refreshMarketData();
        return data;
      }}
    />
  );
};

export default FXTab;
