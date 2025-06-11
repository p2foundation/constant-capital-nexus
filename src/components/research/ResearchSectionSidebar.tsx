
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ResearchLoginPrompt from './ResearchLoginPrompt';
import ResearchSubscribe from './ResearchSubscribe';

const ResearchSectionSidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="lg:w-1/3">
      <h2 className="text-3xl sm:text-4xl font-bold text-cc-navy dark:text-white mb-4 text-left">Research Portal</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-left">
        Our research team provides in-depth analysis and insights on West African markets,
        equities, fixed income securities, and macroeconomic trends.
      </p>
      
      {!user && <ResearchLoginPrompt />}
      
      <ResearchSubscribe />
    </div>
  );
};

export default ResearchSectionSidebar;
