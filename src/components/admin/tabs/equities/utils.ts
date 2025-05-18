
import { ProcessedEquitiesData } from './types';

export const formatDateString = (dateStr: string): string => {
  try {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  } catch (error) {
    return dateStr;
  }
};

export const getChangeColorClass = (change: number): string => {
  return change >= 0 
    ? "text-green-600 font-medium" 
    : "text-red-600 font-medium";
};

export const processEquitiesData = (data: any[]): ProcessedEquitiesData[] => {
  const dateMap = new Map<string, Map<string, { value: number, change_percent: number }>>();
  
  if (data && data.length > 0) {
    data.forEach(item => {
      if (item && item.date) {
        const dateStr = new Date(item.date).toLocaleDateString('en-GB');
        if (!dateMap.has(dateStr)) {
          dateMap.set(dateStr, new Map());
        }
        if (item.ticker_symbol) {
          dateMap.get(dateStr)?.set(item.ticker_symbol.toLowerCase(), {
            value: parseFloat(item.value),
            change_percent: parseFloat(item.change_percent || '0')
          });
        }
      }
    });
  }
  
  // Convert to array format for easier rendering
  const result: ProcessedEquitiesData[] = [];
  dateMap.forEach((symbolMap, date) => {
    const entry: ProcessedEquitiesData = { date };
    symbolMap.forEach((data, symbol) => {
      const symbolLower = symbol.toLowerCase();
      entry[symbolLower] = data.value;
      entry[`${symbolLower}_change`] = data.change_percent;
      entry[`${symbolLower}_positive`] = data.change_percent >= 0;
    });
    result.push(entry);
  });
  
  return result.sort((a, b) => {
    // Sort by date in descending order
    const dateA = new Date(formatDateString(a.date)).getTime();
    const dateB = new Date(formatDateString(b.date)).getTime();
    return dateB - dateA;
  });
};
