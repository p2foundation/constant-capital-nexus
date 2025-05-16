
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fixedIncomeData } from './mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const FixedIncomeChart: React.FC = () => {
  const { marketData } = useMarketData();
  
  // Process market data for charting or use mock data
  const chartData = marketData.fixedIncome.length > 0 ? 
    [...new Set(marketData.fixedIncome.map(item => item.date))].map(date => {
      const dateItems = marketData.fixedIncome.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
        yield91: dateItems.find(i => i.ticker_symbol === '91-day')?.value,
        yield182: dateItems.find(i => i.ticker_symbol === '182-day')?.value,
        yield1yr: dateItems.find(i => i.ticker_symbol === '1-year')?.value
      };
    }) : fixedIncomeData;
  
  // Calculate min and max for the Y axis domain
  const allValues = chartData.flatMap(item => [item.yield91, item.yield182, item.yield1yr].filter(Boolean));
  const minValue = allValues.length ? Math.min(...allValues) * 0.98 : 18;
  const maxValue = allValues.length ? Math.max(...allValues) * 1.02 : 25;
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color91" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A2342" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0A2342" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="color182" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#126872" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#126872" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="color1yr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis domain={[minValue, maxValue]} />
          <Tooltip 
            formatter={(value) => [`${value}%`, '']}
            labelFormatter={(label) => `${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="yield91" 
            name="91-Day T-Bill" 
            stroke="#0A2342" 
            fillOpacity={1} 
            fill="url(#color91)" 
          />
          <Area 
            type="monotone" 
            dataKey="yield182" 
            name="182-Day T-Bill" 
            stroke="#126872" 
            fillOpacity={1} 
            fill="url(#color182)" 
          />
          <Area 
            type="monotone" 
            dataKey="yield1yr" 
            name="1-Year Note" 
            stroke="#D4AF37" 
            fillOpacity={1} 
            fill="url(#color1yr)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FixedIncomeChart;
