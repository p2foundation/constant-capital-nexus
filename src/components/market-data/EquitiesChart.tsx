
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { equitiesData } from './mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const EquitiesChart: React.FC = () => {
  const { marketData } = useMarketData();
  
  // Process market data for charting or use mock data
  const chartData = React.useMemo(() => {
    if (marketData.equities.length === 0) return equitiesData;
    
    const dateMap = new Map<string, any>();
    
    // Group by date
    marketData.equities.forEach(item => {
      if (!item.date || !item.ticker_symbol) return;
      
      const dateStr = new Date(item.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
      if (!dateMap.has(dateStr)) {
        dateMap.set(dateStr, { name: dateStr });
      }
      
      const entry = dateMap.get(dateStr);
      const symbol = item.ticker_symbol.toLowerCase();
      entry[symbol] = parseFloat(item.value.toString()); // Convert value to string before parsing
    });
    
    // Convert to array and sort by date
    return Array.from(dateMap.values()).sort((a, b) => {
      const dateA = new Date(a.name.split(' ')[1] + ' ' + a.name.split(' ')[0]);
      const dateB = new Date(b.name.split(' ')[1] + ' ' + b.name.split(' ')[0]);
      return dateA.getTime() - dateB.getTime();
    });
  }, [marketData.equities]);
  
  // Calculate min and max for the Y axis domain
  const allValues = chartData.flatMap(item => ['gcb', 'scb', 'eti'].map(key => item[key]).filter(Boolean));
  const minValue = allValues.length ? Math.min(...allValues) * 0.98 : 0;
  const maxValue = allValues.length ? Math.max(...allValues) * 1.02 : 20;
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGGB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A2342" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0A2342" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorSCC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#126872" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#126872" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorETI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F2981D" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F2981D" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis domain={[minValue, maxValue]} />
          <Tooltip 
            formatter={(value) => [`GHS ${value}`, '']}
            labelFormatter={(label) => `${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="gcb" 
            name="GCB Bank" 
            stroke="#0A2342" 
            fillOpacity={1} 
            fill="url(#colorGGB)" 
          />
          <Area 
            type="monotone" 
            dataKey="scb" 
            name="Standard Chartered" 
            stroke="#126872" 
            fillOpacity={1} 
            fill="url(#colorSCC)" 
          />
          <Area 
            type="monotone" 
            dataKey="eti" 
            name="Ecobank Ghana" 
            stroke="#F2981D" 
            fillOpacity={1} 
            fill="url(#colorETI)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquitiesChart;
