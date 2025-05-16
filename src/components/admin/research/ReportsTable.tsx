
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResearchReport } from '@/types/supabase';
import ReportStatusBadge from './ReportStatusBadge';
import TableActions from './TableActions';

interface ReportsTableProps {
  reports: ResearchReport[];
  onEdit: (report: ResearchReport) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  isFiltering: boolean;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  onEdit,
  onDelete,
  formatDate,
  isFiltering,
}) => {
  return (
    <ScrollArea className="h-[calc(100vh-24rem)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                {isFiltering ? 
                  "No reports found matching your search criteria." : 
                  "No reports found. Create your first research report."
                }
              </TableCell>
            </TableRow>
          ) : (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell className="capitalize">{report.type.replace('-', ' ')}</TableCell>
                <TableCell>{formatDate(report.date)}</TableCell>
                <TableCell>{report.author || '-'}</TableCell>
                <TableCell>
                  <ReportStatusBadge isPremium={report.is_premium} />
                </TableCell>
                <TableCell className="text-right">
                  <TableActions 
                    reportId={report.id} 
                    onEdit={() => onEdit(report)} 
                    onDelete={() => onDelete(report.id)} 
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default ReportsTable;
