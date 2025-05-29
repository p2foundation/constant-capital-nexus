
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { LogIn, Download, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { trackBusinessEvent } from '@/utils/analytics';

const ResearchSidebar: React.FC = () => {
  const { user } = useAuth();

  const handleSampleDownload = (reportType: string) => {
    toast.info(`Sample ${reportType} downloaded successfully`);
    // Track the sample download
    trackBusinessEvent.researchDownload(`Sample ${reportType}`);
    // In a real implementation, this would trigger an actual download
  };

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
            Research Publications
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Download sample reports to preview our research quality and insights.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Weekly Market Review</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleSampleDownload('Weekly Market Review')}
                className="border-cc-gold text-cc-gold hover:bg-cc-gold hover:text-white dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold dark:hover:text-cc-navy"
              >
                <Download className="h-3 w-3 mr-1" /> Sample
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Monthly Economic Update</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleSampleDownload('Monthly Economic Update')}
                className="border-cc-gold text-cc-gold hover:bg-cc-gold hover:text-white dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold dark:hover:text-cc-navy"
              >
                <Download className="h-3 w-3 mr-1" /> Sample
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Quarterly Outlook</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleSampleDownload('Quarterly Outlook')}
                className="border-cc-gold text-cc-gold hover:bg-cc-gold hover:text-white dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold dark:hover:text-cc-navy"
              >
                <Download className="h-3 w-3 mr-1" /> Sample
              </Button>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Industry Analysis</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleSampleDownload('Industry Analysis')}
                className="border-cc-gold text-cc-gold hover:bg-cc-gold hover:text-white dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold dark:hover:text-cc-navy"
              >
                <Download className="h-3 w-3 mr-1" /> Sample
              </Button>
            </li>
          </ul>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Sample reports provide an overview of our research methodology and insights.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Subscribe to Updates</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Stay informed with our latest research reports and market insights delivered to your inbox.
          </p>
          <form className="space-y-3" onSubmit={(e) => {
            e.preventDefault();
            trackBusinessEvent.newsletterSubscribe();
            toast.success('Thank you for subscribing to our newsletter!');
          }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
            <Button type="submit" className="w-full">Subscribe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchSidebar;
