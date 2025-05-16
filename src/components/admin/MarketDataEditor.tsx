
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useApiData } from '@/hooks/useApiData';

interface DataPoint {
  [key: string]: string | number;
}

interface MarketDataEditorProps {
  title: string;
  initialData: DataPoint[];
  dataFields: {
    name: string;
    label: string;
    type: 'text' | 'number';
  }[];
  fetchFn: () => Promise<DataPoint[]>;
  updateFn: (data: DataPoint[]) => Promise<any>;
}

const MarketDataEditor: React.FC<MarketDataEditorProps> = ({
  title,
  initialData,
  dataFields,
  fetchFn,
  updateFn
}) => {
  const { data, setData, isLoading, isSaving, saveData } = useApiData<DataPoint[]>(
    fetchFn, 
    updateFn, 
    initialData, 
    `Failed to load ${title.toLowerCase()} data`
  );
  
  const [newDataPoint, setNewDataPoint] = useState<DataPoint>(
    dataFields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === 'number' ? '' : ''
    }), {})
  );
  
  const handleInputChange = (field: string, value: string) => {
    setNewDataPoint({
      ...newDataPoint,
      [field]: value
    });
  };
  
  const handleAddDataPoint = () => {
    // Validate all fields are filled
    const missingFields = dataFields.filter(field => 
      !newDataPoint[field.name] && newDataPoint[field.name] !== 0
    );
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Convert number fields to actual numbers
    const processedDataPoint = { ...newDataPoint };
    dataFields.forEach(field => {
      if (field.type === 'number' && typeof processedDataPoint[field.name] === 'string') {
        processedDataPoint[field.name] = parseFloat(processedDataPoint[field.name] as string);
      }
    });
    
    const updatedData = [...data, processedDataPoint];
    setData(updatedData);
    
    // Reset form
    const emptyDataPoint = dataFields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === 'number' ? '' : ''
    }), {});
    setNewDataPoint(emptyDataPoint);
    
    toast.success(`${title} data point added`);
  };
  
  const handleDeleteDataPoint = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    toast.success(`${title} data point deleted`);
  };
  
  const handleSaveData = () => {
    saveData(data);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading {title.toLowerCase()} data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 pb-4">
        <h3 className="text-lg font-medium">Add New {title} Data Point</h3>
        <div className="flex flex-wrap gap-4">
          {dataFields.map((field) => (
            <div key={field.name} className="w-full md:flex-1">
              <label className="text-sm font-medium mb-1 block">{field.label}</label>
              <Input 
                type={field.type}
                placeholder={`e.g. ${field.type === 'number' ? '100.00' : 'May 2025'}`}
                value={newDataPoint[field.name]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            </div>
          ))}
          <div className="flex items-end w-full md:w-auto">
            <Button onClick={handleAddDataPoint} className="w-full">
              Add Data Point
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {dataFields.map(field => (
                <TableHead key={field.name}>{field.label}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {dataFields.map(field => (
                  <TableCell key={field.name}>
                    {field.type === 'number' && typeof item[field.name] === 'number' 
                      ? (item[field.name] as number).toFixed(2) 
                      : item[field.name]}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteDataPoint(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button onClick={handleSaveData} disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Saving...
            </>
          ) : (
            `Save ${title} Data`
          )}
        </Button>
      </div>
    </div>
  );
};

export default MarketDataEditor;
