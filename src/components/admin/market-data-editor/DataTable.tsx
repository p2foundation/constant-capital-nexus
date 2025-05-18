
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataPoint {
  [key: string]: string | number | boolean | React.ReactNode;
}

interface DataField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'hidden';
}

interface DataTableProps {
  data: DataPoint[];
  dataFields: DataField[];
  showChangeColors: boolean;
  onDeleteDataPoint: (index: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  dataFields,
  showChangeColors,
  onDeleteDataPoint
}) => {
  // Filter out hidden fields for display
  const visibleFields = dataFields.filter(field => field.type !== 'hidden');
  
  // Helper function to render cell content
  const renderCellContent = (item: DataPoint, field: DataField): React.ReactNode => {
    let cellContent: React.ReactNode = item[field.name];
    
    // Format numbers
    if (field.type === 'number' && typeof cellContent === 'number') {
      cellContent = cellContent.toFixed(2);
    }
    
    // Add prefixes and styling for change percentages
    if (showChangeColors && field.name.includes('_change')) {
      const baseField = field.name.replace('_change', '');
      const positiveField = `${baseField}_positive`;
      const isPositive = item[positiveField] === true;
      
      if (typeof cellContent === 'string' || typeof cellContent === 'number') {
        return (
          <div className="flex items-center">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span>{isPositive ? '+' : ''}{cellContent}%</span>
          </div>
        );
      }
    }
    
    // GSE special case for change_percent (not using _change suffix)
    if (showChangeColors && field.name === 'change_percent') {
      const isPositive = item['is_positive'] === true;
      
      if (typeof cellContent === 'string' || typeof cellContent === 'number') {
        return (
          <div className="flex items-center">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span>{isPositive ? '+' : ''}{cellContent}%</span>
          </div>
        );
      }
    }
    
    return cellContent;
  };
  
  // Helper function to get cell class based on change value
  const getCellClass = (item: DataPoint, field: DataField): string => {
    let cellClass = '';
    
    if (showChangeColors && field.name.includes('_change')) {
      const baseField = field.name.replace('_change', '');
      const positiveField = `${baseField}_positive`;
      const isPositive = item[positiveField] === true;
      cellClass = isPositive ? 'text-green-600' : 'text-red-600';
    }
    
    // GSE special case
    if (showChangeColors && field.name === 'change_percent') {
      const isPositive = item['is_positive'] === true;
      cellClass = isPositive ? 'text-green-600' : 'text-red-600';
    }
    
    return cellClass;
  };

  return (
    <div className="max-h-80 overflow-y-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleFields.map(field => (
              <TableHead key={field.name}>{field.label}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {visibleFields.map(field => (
                <TableCell 
                  key={field.name} 
                  className={getCellClass(item, field)}
                >
                  {renderCellContent(item, field)}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDeleteDataPoint(index)}
                    className="flex gap-1 items-center"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
