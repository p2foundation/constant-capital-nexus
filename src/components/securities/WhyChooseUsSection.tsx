
import React from 'react';
import { BarChart3, AreaChart, ChartLine } from 'lucide-react';

const WhyChooseUsSection = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-cc-navy dark:text-white">Why Choose Us</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="mr-4 bg-cc-navy p-3 rounded-full dark:bg-cc-gold">
            <BarChart3 className="h-6 w-6 text-white dark:text-cc-navy" />
          </div>
          <div>
            <h4 className="text-xl font-medium mb-2 dark:text-white">Expertise & Experience</h4>
            <p className="text-gray-600 dark:text-gray-300">Our team has extensive knowledge of African markets and global financial trends.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-cc-navy p-3 rounded-full dark:bg-cc-gold">
            <AreaChart className="h-6 w-6 text-white dark:text-cc-navy" />
          </div>
          <div>
            <h4 className="text-xl font-medium mb-2 dark:text-white">Advanced Technology</h4>
            <p className="text-gray-600 dark:text-gray-300">State-of-the-art trading platforms and execution systems.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mr-4 bg-cc-navy p-3 rounded-full dark:bg-cc-gold">
            <ChartLine className="h-6 w-6 text-white dark:text-cc-navy" />
          </div>
          <div>
            <h4 className="text-xl font-medium mb-2 dark:text-white">Market Insights</h4>
            <p className="text-gray-600 dark:text-gray-300">Regular market updates and investment research to guide your decisions.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium mb-4 dark:text-white">Ready to start trading?</h4>
        <button className="bg-cc-navy hover:bg-blue-900 text-white font-medium py-3 px-6 rounded dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
          Contact Our Trading Desk
        </button>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
