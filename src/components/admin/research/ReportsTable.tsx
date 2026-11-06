
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
import ReviewStatusBadge from './ReviewStatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Check, Undo2 } from 'lucide-react';
import { reviewReport } from '@/hooks/research/reviewActions';

interface ReportsTableProps {
  reports: ResearchReport[];
  onEdit: (report: ResearchReport) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  isFiltering: boolean;
  onReviewed?: () => void;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  onEdit,
  onDelete,
  formatDate,
  isFiltering,
  onReviewed,
}) => {
  const { user, profile } = useAuth();
  const canApprove = ['Admin', 'Developer'].includes(String(profile?.role ?? ''));
  const decide = async (r: ResearchReport, decision: 'published' | 'rejected') => {
    let note: string | undefined;
    if (decision === 'rejected') {
      const n = window.prompt('What should the writer change? (shown to them)');
      if (n === null) return;
      note = n;
    }
    if (await reviewReport(r.id, decision, note)) onReviewed?.();
  };
  return (
    <ScrollArea className="h-[calc(100vh-24rem)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Review</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <ReviewStatusBadge status={report.status} />
                    {report.submitted_by_name && (
                      <span className="text-xs text-muted-foreground">By {report.submitted_by_name}</span>
                    )}
                    {report.reviewed_at && (report.status === 'published' || report.status === 'rejected') && (
                      <span className="text-xs text-muted-foreground">
                        {report.status === 'published' ? 'Approved' : 'Returned'} by {report.reviewed_by_name || 'a manager'} · {formatDate(report.reviewed_at)}
                      </span>
                    )}
                    {report.status === 'rejected' && report.review_note && (
                      <span className="text-xs text-muted-foreground max-w-[14rem]">“{report.review_note}”</span>
                    )}
                    {canApprove && report.status === 'pending_review' && (
                      report.submitted_by === user?.id ? (
                        <span className="text-xs text-muted-foreground">Needs another manager</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button size="sm" className="h-7 px-2" onClick={() => decide(report, 'published')}>
                            <Check className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => decide(report, 'rejected')}>
                            <Undo2 className="h-3.5 w-3.5 mr-1" /> Return
                          </Button>
                        </div>
                      )
                    )}
                  </div>
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
