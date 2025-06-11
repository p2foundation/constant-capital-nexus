
import React from 'react';
import { useResearchReports } from '@/hooks/useResearchReports';
import ResearchSectionSidebar from './research/ResearchSectionSidebar';
import ResearchTabs from './research/ResearchTabs';

const Research = () => {
  const { reports, isLoading } = useResearchReports({
    fetchPremiumContent: false,
    limit: 12
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getReportsByType = (type: string | null, limit = 2) => {
    if (!reports || reports.length === 0) return [];

    if (!type) {
      return reports.slice(0, limit);
    }

    const typeMap: Record<string, string> = {
      'equities': 'equity-research',
      'fixedincome': 'fixed-income',
      'macroeconomic': 'economic-analysis'
    };

    const filteredReports = reports.filter(
      report => report.type === (typeMap[type] || type)
    );
    return filteredReports.slice(0, limit);
  };

  return (
    <div className="py-20 dark:bg-cc-navy/95" id="research">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <ResearchSectionSidebar />
          <ResearchTabs 
            reports={reports}
            isLoading={isLoading}
            formatDate={formatDate}
            getReportsByType={getReportsByType}
          />
        </div>
      </div>
    </div>
  );
};

export default Research;
