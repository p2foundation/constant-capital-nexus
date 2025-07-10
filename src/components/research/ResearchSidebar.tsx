
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { LogIn, Download, FileText, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { trackBusinessEvent } from '@/utils/analytics';
import { canAccessPremiumContent } from '@/utils/premiumAccess';
import ResearchSubscribe from './ResearchSubscribe';

const ResearchSidebar: React.FC = () => {
  const { user, profile } = useAuth();
  const hasPremiumAccess = canAccessPremiumContent(profile);

  const handleSampleDownload = (reportType: string) => {
    if (!user) {
      toast.error('Please log in to download reports');
      return;
    }
    
    if (!hasPremiumAccess) {
      toast.error('Premium access required to download reports');
      return;
    }
    
    toast.success(`${reportType} downloaded successfully`);
    // Track the sample download
    trackBusinessEvent.researchDownload(`${reportType}`);
    // In a real implementation, this would trigger an actual download
  };

  const sampleReports = [
    { name: 'GSE Daily Market Report', description: 'Daily equity market analysis and GSE index performance' },
    { name: 'Banking Sector Analysis', description: 'Comprehensive analysis of Ghana\'s banking sector' },
    { name: 'Fixed Income Weekly', description: 'Treasury bills and government securities outlook' },
    { name: 'Eurobonds Market Update', description: 'West African sovereign bond performance review' }
  ];

  return (
    <div className="space-y-6">
      {!user && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg mb-4">Research Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Log in to access our premium research reports and market insights. For clients with investment accounts.
            </p>
            <Button asChild className="w-full">
              <Link to="/login" className="flex items-center justify-center">
                <LogIn className="h-4 w-4 mr-2" />
                Log In to Access
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-cc-gold" />
            Premium Research Reports
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Access our latest market research, GSE analysis and investment insights. Premium subscription required.
          </p>
          <ul className="space-y-3 text-sm">
            {sampleReports.map((report, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1 min-w-0">
                  <span className="text-gray-700 dark:text-gray-300 font-medium block">{report.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{report.description}</span>
                </div>
                {user && hasPremiumAccess ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSampleDownload(report.name)}
                    className="ml-3 border-cc-gold text-cc-gold hover:bg-cc-gold hover:text-white dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold dark:hover:text-cc-navy"
                  >
                    <Download className="h-3 w-3 mr-1" /> Download
                  </Button>
                ) : (
                  <div className="ml-3 flex items-center text-gray-400">
                    <Lock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Premium</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {user && !hasPremiumAccess && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-xs text-amber-600 dark:text-amber-300">
                Premium access required. Contact your relationship manager to upgrade your account.
              </p>
            </div>
          )}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Research reports provide comprehensive market analysis and investment insights for the Ghana Stock Exchange.
          </div>
        </CardContent>
      </Card>

      <ResearchSubscribe />
    </div>
  );
};

export default ResearchSidebar;
