
import React from 'react';
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getChangeColorClass } from '../utils';

interface EquityTableRowProps {
  date: string;
  symbol: string;
  value: number | string;
  change: number;
  isFirstInDate: boolean;
  dateRowSpan: number;
  onDelete: (date: string, symbol: string) => void;
}

const EquityTableRow: React.FC<EquityTableRowProps> = ({ 
  date,
  symbol,
  value,
  change,
  isFirstInDate,
  dateRowSpan,
  onDelete
}) => {
  // Format the change value with the appropriate sign
  const formattedChange = typeof change === 'number' 
    ? (change > 0 ? '+' : change < 0 ? '' : '') + change.toFixed(2) 
    : change;

  return (
    <TableRow key={`${date}-${symbol}`}>
      {isFirstInDate && (
        <TableCell rowSpan={dateRowSpan}>
          {date}
        </TableCell>
      )}
      <TableCell>
        {symbol}
      </TableCell>
      <TableCell>{typeof value === 'number' ? value.toFixed(2) : value}</TableCell>
      <TableCell className={getChangeColorClass(typeof change === 'number' ? change : 0)}>
        {formattedChange}%
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500"
          onClick={() => onDelete(date, symbol)}
        >
          <Trash2 size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EquityTableRow;
