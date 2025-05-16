
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface ResearchDetailContentProps {
  preview: string;
  content?: string;
}

const ResearchDetailContent = ({ preview, content }: ResearchDetailContentProps) => {
  return (
    <div className="space-y-4">
      <div className="text-gray-600 dark:text-gray-300 font-medium italic border-l-4 border-cc-navy dark:border-cc-gold pl-4 py-2 bg-gray-50 dark:bg-gray-800/50">
        {preview}
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
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
