
import React, { useState } from 'react';
import { CalendarIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { 
  Popover, PopoverContent, PopoverTrigger 
} from "@/components/ui/popover";
import { LISTED_COMPANIES, EquitiesDataPoint } from './types';

interface EquitiesDataFormProps {
  onAddDataPoint: (dataPoint: EquitiesDataPoint) => void;
}

const EquitiesDataForm: React.FC<EquitiesDataFormProps> = ({ onAddDataPoint }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>("GCB");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [value, setValue] = useState<string>("");
  const [changePercent, setChangePercent] = useState<string>("");

  const handleAddDataPoint = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    
    if (!value || value.trim() === '') {
      toast.error("Please enter a value");
      return;
    }
    
    const dateString = format(selectedDate, 'dd/MM/yyyy');
    const numValue = parseFloat(value);
    const numChangePercent = parseFloat(changePercent || '0');
    
    // Create new data point
    const newDataPoint: EquitiesDataPoint = {
      date: dateString,
      symbol: selectedCompany,
      value: numValue,
      change_percent: numChangePercent,
      isNew: true
    };
    
    onAddDataPoint(newDataPoint);
    
    // Reset form
    setValue("");
    setChangePercent("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Add New Equities Data Point</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="block mb-2 text-sm font-medium">Date</Label>
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
                  onSelect={setSelectedDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label className="block mb-2 text-sm font-medium">Company</Label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full p-2 border rounded-md text-base bg-background"
            >
              {LISTED_COMPANIES.map((company) => (
                <option key={company.symbol} value={company.symbol}>
                  {company.symbol} - {company.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="block mb-2 text-sm font-medium">Value (GHS)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="e.g. 7.50"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium">Change %</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="e.g. 2.5"
                value={changePercent}
                onChange={(e) => setChangePercent(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAddDataPoint}
            className="flex items-center gap-1"
          >
            <PlusCircle size={16} />
            Add Data Point
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquitiesDataForm;
