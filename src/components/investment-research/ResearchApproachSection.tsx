
import React from 'react';
import { Users, Target, Globe } from 'lucide-react';

const ResearchApproachSection = () => {
  return (
    <div className="my-16 bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Our Research Approach</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
            <Users className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">Expert Team</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our analysts combine international experience with deep local market knowledge 
            and sector expertise.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
            <Target className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">Rigorous Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300">
            We employ multiple valuation methodologies and stress-test our models 
            against various scenarios.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
            <Globe className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">Local Context</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our research incorporates local market dynamics, regulatory environment, 
            and cultural factors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchApproachSection;
