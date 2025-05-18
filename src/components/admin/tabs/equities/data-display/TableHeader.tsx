
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EquitiesTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Value (GHS)</TableHead>
        <TableHead>Change %</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default EquitiesTableHeader;
