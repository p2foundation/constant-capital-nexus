
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { gseData } from './mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const GSEChart: React.FC = () => {
  const { marketData } = useMarketData();
  
  // Format GSE data for the chart or use mock data if no real data is available
  const chartData = marketData.gse.length > 0 ? 
    marketData.gse.map(item => ({
      name: new Date(item.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
      value: item.value,
      change_percent: item.change_percent || 0
    })) : gseData;
  
  // Calculate min and max for the Y axis domain
  const minValue = Math.min(...chartData.map(item => item.value)) * 0.98;
  const maxValue = Math.max(...chartData.map(item => item.value)) * 1.02;

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGSE" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#126872" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#126872" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis domain={[minValue || 2800, maxValue || 3400]} />
          <Tooltip 
            formatter={(value, name) => [
              name === 'value' ? `${value}` : `${value}%`, 
              name === 'value' ? 'GSE Index' : 'Change %'
            ]}
            labelFormatter={(label) => `${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#0A2342" 
            fillOpacity={1} 
            fill="url(#colorGSE)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GSEChart;
