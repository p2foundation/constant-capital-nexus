
import React from 'react';
import MarketDataEditor from '../MarketDataEditor';
import { marketDataAPI } from '@/services/api';
import { fixedIncomeData } from '@/components/market-data/mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const FixedIncomeTab: React.FC = () => {
  const { marketData, refreshMarketData } = useMarketData();
  
  // Format fixed income data for the editor
  const formattedData = marketData.fixedIncome.length > 0 ? 
    [...new Set(marketData.fixedIncome.map(item => item.date))].map(date => {
      const dateItems = marketData.fixedIncome.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB'),
        yield91: dateItems.find(i => i.ticker_symbol === '91-day')?.value || 0,
        yield182: dateItems.find(i => i.ticker_symbol === '182-day')?.value || 0,
        yield1yr: dateItems.find(i => i.ticker_symbol === '1-year')?.value || 0
      };
    }) : 
    fixedIncomeData;

  return (
    <MarketDataEditor
      title="Fixed Income"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'yield91', label: '91-Day (%)', type: 'number' },
        { name: 'yield182', label: '182-Day (%)', type: 'number' },
        { name: 'yield1yr', label: '1-Year (%)', type: 'number' }
      ]}
      fetchFn={async () => {
        if (marketData.fixedIncome.length > 0) {
          return formattedData;
        }
        return marketDataAPI.getFixedIncomeData().then(data => data || fixedIncomeData);
      }}
      updateFn={async (data) => {
        await marketDataAPI.updateFixedIncomeData(data);
        refreshMarketData();
        return data;
      }}
    />
  );
};

export default FixedIncomeTab;
