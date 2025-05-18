
import React from 'react';
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { EquitiesDataPoint } from './types';
import { getChangeColorClass } from './utils';

interface UnsavedChangesProps {
  unsavedChanges: EquitiesDataPoint[];
  onDelete: (index: number) => void;
}

const UnsavedChanges: React.FC<UnsavedChangesProps> = ({ unsavedChanges, onDelete }) => {
  if (unsavedChanges.length === 0) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md">
      <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-500 mb-2">Unsaved Changes</h3>
      <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-4">
        You have {unsavedChanges.length} unsaved data point{unsavedChanges.length > 1 ? 's' : ''}. Click Save Changes to persist them to the database.
      </p>
      
      <div className="max-h-60 overflow-y-auto border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Value (GHS)</TableHead>
              <TableHead>Change %</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unsavedChanges.map((change, index) => (
              <TableRow key={`unsaved-${index}`}>
                <TableCell>{change.date}</TableCell>
                <TableCell>{change.symbol}</TableCell>
                <TableCell>{change.value.toFixed(2)}</TableCell>
                <TableCell className={getChangeColorClass(change.change_percent)}>
                  {change.change_percent >= 0 ? '+' : ''}{change.change_percent.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-red-500"
                    onClick={() => onDelete(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UnsavedChanges;
