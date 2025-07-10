
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fxData } from './mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const FXChart: React.FC = () => {
  const { marketData } = useMarketData();
  
  // Process market data for charting or use mock data
  const chartData = marketData.fx.length > 0 ? 
    [...new Set(marketData.fx.map(item => item.date))].map(date => {
      const dateItems = marketData.fx.filter(d => d.date === date);
      return {
        name: new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
        usd: dateItems.find(i => i.ticker_symbol === 'USD')?.value,
        eur: dateItems.find(i => i.ticker_symbol === 'EUR')?.value,
        gbp: dateItems.find(i => i.ticker_symbol === 'GBP')?.value
      };
    }) : fxData;
  
  // Calculate min and max for the Y axis domain
  const allValues = chartData.flatMap(item => [item.usd, item.eur, item.gbp].filter(Boolean));
  const minValue = allValues.length ? Math.min(...allValues) * 0.98 : 11;
  const maxValue = allValues.length ? Math.max(...allValues) * 1.02 : 16;

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUSD" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A2342" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0A2342" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorEUR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#126872" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#126872" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorGBP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis domain={[minValue, maxValue]} />
          <Tooltip 
            formatter={(value, name) => [`GHS ${value}`, name]}
            labelFormatter={(label) => `${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="usd" 
            name="USD/GHS" 
            stroke="#0A2342" 
            fillOpacity={1} 
            fill="url(#colorUSD)" 
          />
          <Area 
            type="monotone" 
            dataKey="eur" 
            name="EUR/GHS" 
            stroke="#126872" 
            fillOpacity={1} 
            fill="url(#colorEUR)" 
          />
          <Area 
            type="monotone" 
            dataKey="gbp" 
            name="GBP/GHS" 
            stroke="#D4AF37" 
            fillOpacity={1} 
            fill="url(#colorGBP)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FXChart;
