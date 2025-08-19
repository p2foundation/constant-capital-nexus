
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { canAccessPremiumContent } from '@/utils/premiumAccess';
import { formatResearchContent, formatPreviewText } from '@/utils/contentFormatter';

interface ResearchDetailContentProps {
  preview: string;
  content?: string;
  isPremium?: boolean;
}

const ResearchDetailContent = ({ preview, content, isPremium = false }: ResearchDetailContentProps) => {
  const { profile, user } = useAuth();
  const hasAccess = canAccessPremiumContent(profile);

  return (
    <div className="space-y-6">
      <div className="text-gray-600 dark:text-gray-300 font-medium italic border-l-4 border-cc-navy dark:border-cc-gold pl-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
        <div dangerouslySetInnerHTML={{ __html: formatPreviewText(preview) }} />
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        {content && (!isPremium || hasAccess) ? (
          <div 
            className="research-content"
            dangerouslySetInnerHTML={{ __html: formatResearchContent(content) }} 
          />
        ) : isPremium && !hasAccess ? (
          <div className="space-y-4">
            <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800 dark:text-orange-200">Premium Content</span>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                The full research report is available for premium subscribers and registered analysts.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {!user ? (
                <>
                  <Button asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      Login to Access
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact" className="flex items-center gap-2">
                      Contact Us
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="outline" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Contact Us for Access
                  </Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              This full research report is available for our clients. Please login to access the complete content or contact our team for more information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild>
                <Link to="/login" className="flex items-center gap-2">
                  Login to Access
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchDetailContent;
