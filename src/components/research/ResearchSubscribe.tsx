
import React from 'react';
import { Button } from "@/components/ui/button";

const ResearchSubscribe: React.FC = () => {
  return (
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
  );
};

export default ResearchSubscribe;
