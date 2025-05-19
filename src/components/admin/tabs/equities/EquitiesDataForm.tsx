
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { EquitiesDataPoint, LISTED_COMPANIES } from './types';
import { useMarketData } from '@/contexts/MarketDataContext';
import { processEquitiesData } from './utils';

interface EquitiesDataFormProps {
  onAddDataPoint: (dataPoint: EquitiesDataPoint) => void;
}

const formSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  symbol: z.string({ required_error: "Symbol is required" }),
  value: z.coerce.number().positive("Value must be a positive number"),
});

const EquitiesDataForm: React.FC<EquitiesDataFormProps> = ({ onAddDataPoint }) => {
  const { marketData } = useMarketData();
  const [processedExistingData, setProcessedExistingData] = useState<any[]>([]);
  
  // Process existing data for previous value lookup
  useEffect(() => {
    const processedData = processEquitiesData(marketData.equities);
    setProcessedExistingData(processedData);
  }, [marketData.equities]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted:", values);
      const dateStr = format(values.date, 'dd/MM/yyyy');
      
      // Find previous value for this symbol to calculate change
      let previousValue: number | undefined;
      let prevDate: string | undefined;
      
      for (const entry of processedExistingData) {
        if (entry[values.symbol.toLowerCase()] !== undefined) {
          previousValue = entry[values.symbol.toLowerCase()];
          prevDate = entry.date;
          break;
        }
      }
      
      if (previousValue !== undefined) {
        console.log(`Found previous value for ${values.symbol}: ${previousValue} from ${prevDate}`);
      }
      
      const dataPoint: EquitiesDataPoint = {
        date: dateStr,
        symbol: values.symbol,
        value: values.value,
        change_percent: 0, // Will be calculated in the hook if previous value exists
        previousValue: previousValue, // Store the previous value for change calculation
      };
      
      onAddDataPoint(dataPoint);
      
      // Reset form fields except date
      form.resetField('symbol');
      form.resetField('value');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Add Equities Data Point</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LISTED_COMPANIES.map((company) => (
                        <SelectItem key={company.symbol} value={company.symbol}>
                          {company.symbol} - {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value (GHS)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter value"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Current stock price in GHS
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Add Data Point</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EquitiesDataForm;
