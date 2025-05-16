
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResearchReports } from '@/hooks/useResearchReports';
import ResearchReportCard from './ResearchReportCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ResearchContentProps {
  currentTab: string;
  currentPage: number;
  onTabChange: (tab: string) => void;
  onPageChange: (page: number) => void;
  formatDate: (dateString: string) => string;
}

const ITEMS_PER_PAGE = 3;

const ResearchContent: React.FC<ResearchContentProps> = ({
  currentTab,
  currentPage,
  onTabChange,
  onPageChange,
  formatDate
}) => {
  // Get reports with the useResearchReports hook
  const { reports, isLoading } = useResearchReports({
    fetchPremiumContent: false,
    limit: 100 // We'll handle pagination on the client side for now
  });

  // Filter reports based on the selected tab
  const getFilteredReports = () => {
    if (currentTab === 'featured') {
      return reports;
    }
    
    const tabTypeMap: Record<string, string> = {
      'equities': 'equity-research',
      'fixedincome': 'fixed-income',
      'macroeconomic': 'economic-analysis'
    };
    
    return reports.filter(report => report.type === tabTypeMap[currentTab]);
  };

  const filteredReports = getFilteredReports();
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="featured">Featured</TabsTrigger>
        <TabsTrigger value="equities">Equities</TabsTrigger>
        <TabsTrigger value="fixedincome">Fixed Income</TabsTrigger>
        <TabsTrigger value="macroeconomic">Macroeconomic</TabsTrigger>
      </TabsList>
      
      <TabsContent value={currentTab} className="mt-0">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : paginatedReports.length > 0 ? (
          <>
            {paginatedReports.map((report) => (
              <ResearchReportCard
                key={report.id}
                id={report.id}
                title={report.title}
                type={report.type.replace('-', ' ')}
                date={formatDate(report.date)}
                preview={report.preview}
                // Image would come from report data if available
              />
            ))}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => onPageChange(currentPage - 1)} 
                      />
                    </PaginationItem>
                  )}
                  
                  {/* Show page numbers */}
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink 
                        isActive={currentPage === i + 1} 
                        onClick={() => onPageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => onPageChange(currentPage + 1)} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-gray-500 dark:text-gray-400">No reports found in this category.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ResearchContent;
