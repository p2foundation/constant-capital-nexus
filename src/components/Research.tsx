
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LogIn, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResearchReports } from '@/hooks/useResearchReports';

const ResearchReport = ({ 
  id,
  title, 
  type, 
  date, 
  preview,
  isPremium = false
}: { 
  id: string;
  title: string; 
  type: string; 
  date: string; 
  preview: string;
  isPremium?: boolean;
}) => {
  return (
    <Card className="mb-4 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row justify-between items-start pb-2">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs font-normal capitalize">
              {type}
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
            {isPremium && (
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                Premium
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{preview}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Login required for full access</div>
          <Link to={`/research/${id}`}>
            <Button variant="ghost" size="sm" className="text-cc-blue hover:text-cc-navy dark:text-cc-gold dark:hover:text-cc-gold/80">
              <Book className="h-4 w-4 mr-1" /> View Report
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const Research = () => {
  // Get reports with the useResearchReports hook - limiting to 3 reports per tab
  const { reports, isLoading } = useResearchReports({
    fetchPremiumContent: false,
    limit: 12 // Fetch more than we need to have enough for each category
  });

  // Format date for display
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

  // Filter and get reports by type
  const getReportsByType = (type: string | null, limit = 2) => {
    if (!reports || reports.length === 0) return [];

    if (!type) {
      // For featured tab, just get the most recent reports
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
          <div className="lg:w-1/3">
            <h2 className="text-3xl sm:text-4xl font-bold text-cc-navy dark:text-white mb-4 text-left">Research Portal</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
              Our research team provides in-depth analysis and insights on West African markets,
              equities, fixed income securities, and macroeconomic trends.
            </p>
            
            <div className="bg-cc-light-blue dark:bg-cc-navy dark:border dark:border-cc-gold/30 p-6 rounded-lg mb-8">
              <h3 className="font-medium text-cc-navy dark:text-white mb-4 text-left">Research Team Access</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-left">
                Members of our research team can log in to upload and publish reports,
                market updates, and investment recommendations.
              </p>
              <Button asChild className="w-full bg-cc-navy hover:bg-cc-blue dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/90">
                <Link to="/login" className="flex items-center justify-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Research Team Login
                </Link>
              </Button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
              <h3 className="font-medium text-cc-navy dark:text-white mb-4 text-left">Subscribe to Research</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-left">
                Get premium research reports delivered directly to your inbox.
                Subscribe to our research newsletter for market insights.
              </p>
              <Button variant="outline" className="w-full border-cc-blue text-cc-blue hover:bg-cc-light-blue dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold/10">
                Subscribe Now
              </Button>
            </div>
          </div>
          
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
                      <ResearchReport
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
                      <ResearchReport
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
                      <ResearchReport
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
                      <ResearchReport
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
        </div>
      </div>
    </div>
  );
};

export default Research;
