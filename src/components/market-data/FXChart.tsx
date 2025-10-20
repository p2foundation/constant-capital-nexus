
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fxData } from './mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const FXChart: React.FC = () => {
  const { marketData } = useMarketData();
  
  // Build chart data with robust fallbacks
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const buildFrom = (items: typeof marketData.fx) => {
    const dateMap: Record<string, any> = {};
    items.forEach(item => {
      const dateKey = new Date(item.date).toISOString().split('T')[0];
      if (!dateMap[dateKey]) {
        dateMap[dateKey] = {
          date: new Date(item.date),
          name: new Date(item.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
          values: {} as Record<string, number>
        };
      }
      const symbol = (item.ticker_symbol || '').toUpperCase();
      if (['USD','EUR','GBP'].includes(symbol)) {
        // Last write wins per date/symbol
        dateMap[dateKey].values[symbol] = Number(item.value);
      }
    });
    return Object.values(dateMap)
      .sort((a: any, b: any) => a.date.getTime() - b.date.getTime())
      .map((item: any) => ({
        name: item.name,
        usd: item.values['USD'],
        eur: item.values['EUR'],
        gbp: item.values['GBP']
      }));
  };

  const recentData = marketData.fx.filter(item => new Date(item.date) >= sixtyDaysAgo);
  console.log('FX - Recent data count:', recentData.length);

  let chartData = buildFrom(recentData);

  if (chartData.length === 0 && marketData.fx.length > 0) {
    // Use most recent 60 unique dates from all FX data
    const sortedAll = [...marketData.fx].sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
    const seen = new Set<string>();
    const subset: typeof marketData.fx = [];
    for (const item of sortedAll) {
      const key = new Date(item.date).toISOString().split('T')[0];
      if (!seen.has(key)) seen.add(key);
      if (seen.size <= 60) subset.push(item);
      else break;
    }
    chartData = buildFrom(subset);
  }

  if (chartData.length === 0) {
    // Final fallback: map mock fxData to expected keys
    chartData = fxData.map((d: any) => ({ name: d.name, usd: d.uv, eur: d.pv, gbp: d.amt }));
  }

  console.log('FX - Chart data:', chartData);
  
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
