
import React from 'react';
import { TableBody } from "@/components/ui/table";
import { ProcessedEquitiesData } from '../types';
import EquityTableRow from './TableRow';

interface EquitiesTableBodyProps {
  processedData: ProcessedEquitiesData[];
  onDeleteDataPoint: (date: string, symbol: string) => void;
}

const EquitiesTableBody: React.FC<EquitiesTableBodyProps> = ({ 
  processedData, 
  onDeleteDataPoint 
}) => {
  return (
    <TableBody>
      {processedData.flatMap((dateEntry) => {
        // Get all symbol keys (excluding metadata keys)
        const symbolKeys = Object.keys(dateEntry).filter(
          key => !key.includes('_') && key !== 'date'
        );
        
        return symbolKeys.map((symbol, index) => {
          const value = dateEntry[symbol];
          const change = dateEntry[`${symbol}_change`] || 0;
          
          return (
            <EquityTableRow
              key={`${dateEntry.date}-${symbol}`}
              date={dateEntry.date}
              symbol={symbol}
              value={value}
              change={change}
              isFirstInDate={index === 0}
              dateRowSpan={symbolKeys.length}
              onDelete={onDeleteDataPoint}
            />
          );
        });
      })}
    </TableBody>
  );
};

export default EquitiesTableBody;
