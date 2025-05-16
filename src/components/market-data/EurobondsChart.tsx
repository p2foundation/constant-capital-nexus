
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { eurobondsData } from './mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const EurobondsChart: React.FC = () => {
  const { marketData } = useMarketData();
  
  // Process market data for charting or use mock data
  const chartData = marketData.eurobonds.length > 0 ? 
    [...new Set(marketData.eurobonds.map(item => item.date))].map(date => {
      const dateItems = marketData.eurobonds.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
        ghana29: dateItems.find(i => i.ticker_symbol === 'Ghana-2029')?.value,
        nigeria32: dateItems.find(i => i.ticker_symbol === 'Nigeria-2032')?.value,
        kenya31: dateItems.find(i => i.ticker_symbol === 'Kenya-2031')?.value
      };
    }) : eurobondsData;
  
  // Calculate min and max for the Y axis domain
  const allValues = chartData.flatMap(item => [item.ghana29, item.nigeria32, item.kenya31].filter(Boolean));
  const minValue = allValues.length ? Math.min(...allValues) * 0.9 : 0;
  const maxValue = allValues.length ? Math.max(...allValues) * 1.1 : 12;
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis domain={[minValue, maxValue]} />
          <Tooltip 
            formatter={(value) => [`${value}%`, '']}
            labelFormatter={(label) => `${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="ghana29" 
            name="Ghana 2029" 
            stroke="#0A2342" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="nigeria32" 
            name="Nigeria 2032" 
            stroke="#126872" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="kenya31" 
            name="Kenya 2031" 
            stroke="#F2981D" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EurobondsChart;
