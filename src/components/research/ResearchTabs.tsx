
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ResearchReport } from '@/types/supabase';
import ResearchReportCard from './ResearchReportCard';

interface ResearchTabsProps {
  reports: ResearchReport[];
  isLoading: boolean;
  formatDate: (dateString: string) => string;
  getReportsByType: (type: string | null, limit?: number) => ResearchReport[];
}

const ResearchTabs: React.FC<ResearchTabsProps> = ({ 
  reports, 
  isLoading, 
  formatDate, 
  getReportsByType 
}) => {
  return (
    <div className="lg:w-2/3">
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="equities">Equities</TabsTrigger>
          <TabsTrigger value="fixedincome">Fixed Income</TabsTrigger>
          <TabsTrigger value="macroeconomic">Macroeconomic</TabsTrigger>
        </TabsList>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <TabsContent value="featured" className="mt-0">
              {getReportsByType(null, 3).map(report => (
                <ResearchReportCard
                  key={report.id}
                  id={report.id}
                  title={report.title}
                  type={report.type.replace('-', ' ')}
                  date={formatDate(report.date)}
                  preview={report.preview}
                  isPremium={report.is_premium}
                />
              ))}
              
              {getReportsByType(null).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No featured reports available.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="equities" className="mt-0">
              {getReportsByType('equities', 2).map(report => (
                <ResearchReportCard
                  key={report.id}
                  id={report.id}
                  title={report.title}
                  type="Equity Research"
                  date={formatDate(report.date)}
                  preview={report.preview}
                  isPremium={report.is_premium}
                />
              ))}
              
              {getReportsByType('equities').length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No equity research reports available.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="fixedincome" className="mt-0">
              {getReportsByType('fixedincome', 2).map(report => (
                <ResearchReportCard
                  key={report.id}
                  id={report.id}
                  title={report.title}
                  type="Fixed Income"
                  date={formatDate(report.date)}
                  preview={report.preview}
                  isPremium={report.is_premium}
                />
              ))}
              
              {getReportsByType('fixedincome').length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No fixed income reports available.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="macroeconomic" className="mt-0">
              {getReportsByType('macroeconomic', 2).map(report => (
                <ResearchReportCard
                  key={report.id}
                  id={report.id}
                  title={report.title}
                  type="Economic Analysis"
                  date={formatDate(report.date)}
                  preview={report.preview}
                  isPremium={report.is_premium}
                />
              ))}
              
              {getReportsByType('macroeconomic').length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No macroeconomic reports available.</p>
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
      
      {!isLoading && reports.length > 0 && (
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="border-cc-blue text-cc-blue hover:bg-cc-light-blue dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold/10">
            <Link to="/research">View All Research Reports</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResearchTabs;
