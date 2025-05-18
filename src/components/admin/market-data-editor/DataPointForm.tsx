
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DataPoint {
  [key: string]: string | number | boolean | React.ReactNode;
}

interface DataField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'hidden';
}

interface DataPointFormProps {
  dataFields: DataField[];
  showDatePicker: boolean;
  onAddDataPoint: (dataPoint: DataPoint) => void;
}

const DataPointForm: React.FC<DataPointFormProps> = ({
  dataFields,
  showDatePicker,
  onAddDataPoint
}) => {
  const [newDataPoint, setNewDataPoint] = useState<DataPoint>(
    dataFields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === 'number' ? '' : ''
    }), {})
  );
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Helper function to convert any type to string or number for input fields
  const getInputValue = (value: any): string | number => {
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    // Convert boolean to string
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    // For any other type (including React nodes), return empty string
    return '';
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setNewDataPoint({
        ...newDataPoint,
        name: format(date, 'dd/MM/yyyy')
      });
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setNewDataPoint({
      ...newDataPoint,
      [field]: value
    });
    
    // Automatically set positive/negative flags for change fields
    if (field.includes('_change')) {
      const baseField = field.replace('_change', '');
      const positiveField = `${baseField}_positive`;
      const isPositive = parseFloat(value) >= 0;
      
      // Only set if the field exists in our data structure
      if (dataFields.some(f => f.name === positiveField)) {
        setNewDataPoint(prev => ({
          ...prev,
          [positiveField]: isPositive
        }));
      }
      
      const isGseChangeField = field === 'change_percent';
      if (isGseChangeField && dataFields.some(f => f.name === 'is_positive')) {
        setNewDataPoint(prev => ({
          ...prev,
          is_positive: isPositive
        }));
      }
    }
  };
  
  const handleAddDataPoint = () => {
    // Validate all visible fields are filled
    const visibleFields = dataFields.filter(field => field.type !== 'hidden');
    const missingFields = visibleFields.filter(field => 
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
        
        // If this is a change field, also set the positive flag
        if (field.name.includes('_change')) {
          const baseField = field.name.replace('_change', '');
          const positiveField = `${baseField}_positive`;
          
          if (dataFields.some(f => f.name === positiveField)) {
            processedDataPoint[positiveField] = parseFloat(processedDataPoint[field.name] as string) >= 0;
          }
        }
      }
    });
    
    onAddDataPoint(processedDataPoint);
    
    // Reset form
    const emptyDataPoint = dataFields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === 'number' ? '' : ''
    }), {});
    setNewDataPoint(emptyDataPoint);
    setSelectedDate(undefined);
  };
  
  // Filter out hidden fields for display
  const visibleFields = dataFields.filter(field => field.type !== 'hidden');
  
  return (
    <div className="flex flex-col gap-4 pb-4">
      <h3 className="text-lg font-medium">Add New Data Point</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {showDatePicker ? (
          <div className="w-full">
            <label className="text-sm font-medium mb-1 block">Date/Period</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          visibleFields[0] && (
            <div className="w-full">
              <label className="text-sm font-medium mb-1 block">{visibleFields[0].label}</label>
              <Input 
                type={visibleFields[0].type}
                placeholder={`e.g. ${visibleFields[0].type === 'number' ? '100.00' : 'May 2025'}`}
                value={getInputValue(newDataPoint[visibleFields[0].name])}
                onChange={(e) => handleInputChange(visibleFields[0].name, e.target.value)}
              />
            </div>
          )
        )}
        
        {visibleFields.slice(showDatePicker ? 1 : 1).map((field) => (
          <div key={field.name} className="w-full">
            <label className="text-sm font-medium mb-1 block">{field.label}</label>
            <Input 
              type={field.type}
              placeholder={`e.g. ${field.type === 'number' ? '100.00' : 'May 2025'}`}
              value={getInputValue(newDataPoint[field.name])}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          </div>
        ))}
        
        <div className="flex items-end w-full">
          <Button onClick={handleAddDataPoint} className="w-full">
            Add Data Point
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataPointForm;
