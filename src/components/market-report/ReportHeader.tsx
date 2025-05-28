
import React from 'react';
import { Calendar, ChartLine, Download, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ReportHeaderProps {
  reportDate: string;
  selectedView: 'charts' | 'summary';
  onChangeView: (view: 'charts' | 'summary') => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ 
  reportDate, 
  selectedView, 
  onChangeView 
}) => {
  return (
    <div className="pt-16 md:pt-20"> {/* Added padding to the top to account for the fixed navbar */}
      <h1 className="text-4xl md:text-5xl font-bold text-cc-navy dark:text-white mb-2">Market Report</h1>
      <div className="flex items-center mb-8 text-gray-600 dark:text-gray-300">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Report date: {reportDate}</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => onChangeView('charts')} 
            className={selectedView === 'charts' ? 'bg-cc-light-blue dark:bg-cc-navy' : ''}
          >
            <ChartLine className="h-4 w-4 mr-2" />
            Charts View
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onChangeView('summary')} 
            className={selectedView === 'summary' ? 'bg-cc-light-blue dark:bg-cc-navy' : ''}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Summary View
          </Button>
          <Button 
            variant="default" 
            className="bg-cc-navy hover:bg-cc-navy/90 dark:bg-cc-gold dark:hover:bg-cc-gold/90"
            onClick={() => window.print()}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
