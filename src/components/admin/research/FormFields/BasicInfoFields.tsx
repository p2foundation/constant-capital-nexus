
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface BasicInfoFieldsProps {
  title: string;
  setTitle: (title: string) => void;
  type: string;
  setType: (type: string) => void;
  date: string;
  setDate: (date: string) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  title,
  setTitle,
  type,
  setType,
  date,
  setDate,
}) => {
  return (
    <>
      <div>
        <Label htmlFor="title">Report Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter report title"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Report Type</Label>
          <Select 
            value={type} 
            onValueChange={setType}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market-report">Market Report</SelectItem>
              <SelectItem value="equity-research">Equity Research</SelectItem>
              <SelectItem value="fixed-income">Fixed Income Analysis</SelectItem>
              <SelectItem value="economic-analysis">Economic Analysis</SelectItem>
              <SelectItem value="sector-outlook">Sector Outlook</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="date">Publication Date</Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfoFields;
