
import React from 'react';
import MarketDataEditor from '../MarketDataEditor';
import { marketDataAPI } from '@/services/api';
import { eurobondsData } from '@/components/market-data/mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const EurobondsTab: React.FC = () => {
  const { marketData, refreshMarketData } = useMarketData();
  
  // Format eurobonds data for the editor
  const formattedData = marketData.eurobonds.length > 0 ? 
    [...new Set(marketData.eurobonds.map(item => item.date))].map(date => {
      const dateItems = marketData.eurobonds.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB'),
        ghana29: dateItems.find(i => i.ticker_symbol === 'Ghana-2029')?.value || 0,
        ghana29_change: dateItems.find(i => i.ticker_symbol === 'Ghana-2029')?.change_percent || 0,
        nigeria32: dateItems.find(i => i.ticker_symbol === 'Nigeria-2032')?.value || 0,
        nigeria32_change: dateItems.find(i => i.ticker_symbol === 'Nigeria-2032')?.change_percent || 0,
        kenya31: dateItems.find(i => i.ticker_symbol === 'Kenya-2031')?.value || 0,
        kenya31_change: dateItems.find(i => i.ticker_symbol === 'Kenya-2031')?.change_percent || 0,
        ghana30: dateItems.find(i => i.ticker_symbol === 'Ghana-2030')?.value || 0,
        ghana30_change: dateItems.find(i => i.ticker_symbol === 'Ghana-2030')?.change_percent || 0
      };
    }) : 
    eurobondsData.map(item => ({
      ...item,
      ghana29_change: 0,
      nigeria32_change: 0,
      kenya31_change: 0,
      ghana30_change: 0
    }));

  return (
    <MarketDataEditor
      title="SSA Eurobonds"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'ghana29', label: 'Ghana 2029 (%)', type: 'number' },
        { name: 'ghana29_change', label: 'Ghana 2029 Change %', type: 'number' },
        { name: 'nigeria32', label: 'Nigeria 2032 (%)', type: 'number' },
        { name: 'nigeria32_change', label: 'Nigeria 2032 Change %', type: 'number' },
        { name: 'kenya31', label: 'Kenya 2031 (%)', type: 'number' },
        { name: 'kenya31_change', label: 'Kenya 2031 Change %', type: 'number' },
        { name: 'ghana30', label: 'Ghana 2030 (%)', type: 'number' },
        { name: 'ghana30_change', label: 'Ghana 2030 Change %', type: 'number' }
      ]}
      fetchFn={async () => {
        if (marketData.eurobonds.length > 0) {
          return formattedData;
        }
        return marketDataAPI.getEurobondsData().then(data => data || eurobondsData);
      }}
      updateFn={async (data) => {
        await marketDataAPI.updateEurobondsData(data);
        refreshMarketData();
        return data;
      }}
      showDatePicker={true}
    />
  );
};

export default EurobondsTab;
