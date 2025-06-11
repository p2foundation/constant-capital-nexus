
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResearchLoginPrompt: React.FC = () => {
  return (
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
  );
};

export default ResearchLoginPrompt;
