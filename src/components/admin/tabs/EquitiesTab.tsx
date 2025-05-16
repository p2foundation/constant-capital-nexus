
import React from 'react';
import MarketDataEditor from '../MarketDataEditor';
import { marketDataAPI } from '@/services/api';
import { equitiesData } from '@/components/market-data/mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const EquitiesTab: React.FC = () => {
  const { marketData, refreshMarketData } = useMarketData();
  
  // Format equities data for the editor
  const formattedData = marketData.equities.length > 0 ? 
    [...new Set(marketData.equities.map(item => item.date))].map(date => {
      const dateItems = marketData.equities.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB'),
        ggb: dateItems.find(i => i.ticker_symbol === 'GCB')?.value || 0,
        scc: dateItems.find(i => i.ticker_symbol === 'SCB')?.value || 0,
        eti: dateItems.find(i => i.ticker_symbol === 'ETI')?.value || 0
      };
    }) : 
    equitiesData;

  return (
    <MarketDataEditor
      title="Equities"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'ggb', label: 'GCB Bank (GHS)', type: 'number' },
        { name: 'scc', label: 'StanChart (GHS)', type: 'number' },
        { name: 'eti', label: 'Ecobank (GHS)', type: 'number' }
      ]}
      fetchFn={async () => {
        if (marketData.equities.length > 0) {
          return formattedData;
        }
        return marketDataAPI.getEquitiesData().then(data => data || equitiesData);
      }}
      updateFn={async (data) => {
        await marketDataAPI.updateEquitiesData(data);
        refreshMarketData();
        return data;
      }}
    />
  );
};

export default EquitiesTab;
