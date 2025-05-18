
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
        yield91_change: dateItems.find(i => i.ticker_symbol === '91-day')?.change_percent || 0,
        yield91_positive: (dateItems.find(i => i.ticker_symbol === '91-day')?.change_percent || 0) >= 0,
        yield182: dateItems.find(i => i.ticker_symbol === '182-day')?.value || 0,
        yield182_change: dateItems.find(i => i.ticker_symbol === '182-day')?.change_percent || 0,
        yield182_positive: (dateItems.find(i => i.ticker_symbol === '182-day')?.change_percent || 0) >= 0,
        yield1yr: dateItems.find(i => i.ticker_symbol === '1-year')?.value || 0,
        yield1yr_change: dateItems.find(i => i.ticker_symbol === '1-year')?.change_percent || 0,
        yield1yr_positive: (dateItems.find(i => i.ticker_symbol === '1-year')?.change_percent || 0) >= 0,
        yield364: dateItems.find(i => i.ticker_symbol === '364-day')?.value || 0,
        yield364_change: dateItems.find(i => i.ticker_symbol === '364-day')?.change_percent || 0,
        yield364_positive: (dateItems.find(i => i.ticker_symbol === '364-day')?.change_percent || 0) >= 0,
        yield3yr: dateItems.find(i => i.ticker_symbol === '3-year')?.value || 0, 
        yield3yr_change: dateItems.find(i => i.ticker_symbol === '3-year')?.change_percent || 0,
        yield3yr_positive: (dateItems.find(i => i.ticker_symbol === '3-year')?.change_percent || 0) >= 0,
        yield5yr: dateItems.find(i => i.ticker_symbol === '5-year')?.value || 0,
        yield5yr_change: dateItems.find(i => i.ticker_symbol === '5-year')?.change_percent || 0,
        yield5yr_positive: (dateItems.find(i => i.ticker_symbol === '5-year')?.change_percent || 0) >= 0
      };
    }) : 
    fixedIncomeData.map(item => ({
      ...item,
      yield91_change: 0,
      yield91_positive: true,
      yield182_change: 0,
      yield182_positive: true,
      yield1yr_change: 0,
      yield1yr_positive: true,
      yield364_change: 0,
      yield364_positive: true,
      yield3yr_change: 0,
      yield3yr_positive: true,
      yield5yr_change: 0,
      yield5yr_positive: true
    }));

  return (
    <MarketDataEditor
      title="Fixed Income"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'yield91', label: '91-Day (%)', type: 'number' },
        { name: 'yield91_change', label: '91-Day Change %', type: 'number' },
        { name: 'yield91_positive', label: '91-Day Change Direction', type: 'hidden' },
        { name: 'yield182', label: '182-Day (%)', type: 'number' },
        { name: 'yield182_change', label: '182-Day Change %', type: 'number' },
        { name: 'yield182_positive', label: '182-Day Change Direction', type: 'hidden' },
        { name: 'yield1yr', label: '1-Year (%)', type: 'number' },
        { name: 'yield1yr_change', label: '1-Year Change %', type: 'number' },
        { name: 'yield1yr_positive', label: '1-Year Change Direction', type: 'hidden' },
        { name: 'yield364', label: '364-Day (%)', type: 'number' },
        { name: 'yield364_change', label: '364-Day Change %', type: 'number' },
        { name: 'yield364_positive', label: '364-Day Change Direction', type: 'hidden' },
        { name: 'yield3yr', label: '3-Year (%)', type: 'number' },
        { name: 'yield3yr_change', label: '3-Year Change %', type: 'number' },
        { name: 'yield3yr_positive', label: '3-Year Change Direction', type: 'hidden' },
        { name: 'yield5yr', label: '5-Year (%)', type: 'number' },
        { name: 'yield5yr_change', label: '5-Year Change %', type: 'number' },
        { name: 'yield5yr_positive', label: '5-Year Change Direction', type: 'hidden' }
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
      showDatePicker={true}
      showChangeColors={true}
    />
  );
};

export default FixedIncomeTab;
