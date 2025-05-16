
import React from 'react';
import MarketDataEditor from '../MarketDataEditor';
import { marketDataAPI } from '@/services/api';
import { gseData } from '@/components/market-data/mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const GSEIndexTab: React.FC = () => {
  const { marketData, refreshMarketData } = useMarketData();
  
  // Format GSE data for the editor
  const formattedData = marketData.gse.length > 0 ? 
    marketData.gse.map(item => ({
      name: new Date(item.date).toLocaleDateString('en-GB'),
      value: item.value,
      change_percent: item.change_percent || 0
    })) : 
    gseData.map(item => ({
      ...item,
      change_percent: 0
    }));

  return (
    <MarketDataEditor
      title="GSE Index"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'value', label: 'Index Value', type: 'number' },
        { name: 'change_percent', label: 'Change %', type: 'number' }
      ]}
      fetchFn={async () => {
        // If we have real data, use it; otherwise use mock
        if (marketData.gse.length > 0) {
          return formattedData;
        }
        return marketDataAPI.getGSEData().then(data => 
          data ? data.map((item: any) => ({
            name: item.name,
            value: item.value,
            change_percent: item.change_percent || 0
          })) : gseData.map(item => ({
            ...item,
            change_percent: 0
          }))
        );
      }}
      updateFn={async (data) => {
        await marketDataAPI.updateGSEData(data);
        refreshMarketData();
        return data;
      }}
    />
  );
};

export default GSEIndexTab;
