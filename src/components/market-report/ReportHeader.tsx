import React from 'react';
import { Calendar, ChartLine, Download, FileSpreadsheet, List, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

export type ReportView = 'instruments' | 'charts' | 'summary';

interface ReportHeaderProps {
  reportDate: string;
  selectedView: ReportView;
  onChangeView: (view: ReportView) => void;
  onExportPdf: () => void;
  onExportCsv: () => void;
  instrumentCount: number;
}

const views: { id: ReportView; label: string; icon: React.ElementType }[] = [
  { id: 'instruments', label: 'All instruments', icon: List },
  { id: 'summary', label: 'Summary', icon: TrendingUp },
  { id: 'charts', label: 'Charts', icon: ChartLine },
];

const ReportHeader: React.FC<ReportHeaderProps> = ({
  reportDate, selectedView, onChangeView, onExportPdf, onExportCsv, instrumentCount,
}) => (
  <div className="pt-24 md:pt-28">
    <p className="text-sm font-medium uppercase tracking-widest text-primary">Research</p>
    <h1 className="mt-2 font-heading text-4xl font-bold text-foreground md:text-5xl">Market Report</h1>
    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
      <span className="inline-flex items-center"><Calendar className="mr-2 h-4 w-4" />Data as at {reportDate}</span>
      <span>{instrumentCount} instruments tracked</span>
    </div>

    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-muted/40 p-1">
        {views.map(({ id, label, icon: Icon }) => (
          <Button key={id} size="sm" variant={selectedView === id ? 'default' : 'ghost'} onClick={() => onChangeView(id)}>
            <Icon className="mr-2 h-4 w-4" />{label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onExportPdf}><Download className="mr-2 h-4 w-4" />Download PDF report</Button>
        <Button variant="outline" onClick={onExportCsv}><FileSpreadsheet className="mr-2 h-4 w-4" />Export CSV</Button>
      </div>
    </div>
  </div>
);

export default ReportHeader;
