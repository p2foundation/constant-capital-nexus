
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="mb-4 flex justify-end">
      <div className="w-48">
        <Select
          value={currentFilter}
          onValueChange={onFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="daily-report">Daily Report</SelectItem>
            <SelectItem value="weekly-report">Weekly Report</SelectItem>
            <SelectItem value="monthly-report">Monthly Report</SelectItem>
            <SelectItem value="quarterly-report">Quarterly Report</SelectItem>
            <SelectItem value="annual-report">Annual Report</SelectItem>
            <SelectItem value="sector-analysis">Sector Analysis</SelectItem>
            <SelectItem value="company-analysis">Company Analysis</SelectItem>
            <SelectItem value="economic-outlook">Economic Outlook</SelectItem>
            <SelectItem value="market-update">Market Update</SelectItem>
            <SelectItem value="special-report">Special Report</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TypeFilter;
