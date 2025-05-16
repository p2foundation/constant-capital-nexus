
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ResearchDetailSidebar = () => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
          <Book className="h-4 w-4" />
          Research Categories
        </h3>
        <ul className="space-y-2">
          <li>
            <Link to="/research?tab=equities" className="text-cc-blue hover:underline dark:text-cc-gold">
              Equity Research
            </Link>
          </li>
          <li>
            <Link to="/research?tab=fixedincome" className="text-cc-blue hover:underline dark:text-cc-gold">
              Fixed Income
            </Link>
          </li>
          <li>
            <Link to="/research?tab=macroeconomic" className="text-cc-blue hover:underline dark:text-cc-gold">
              Macroeconomic
            </Link>
          </li>
          <li>
            <Link to="/research" className="text-cc-blue hover:underline dark:text-cc-gold">
              All Reports
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
        <h3 className="font-medium text-lg mb-4">Subscribe to Updates</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Get our latest research delivered directly to your inbox.
        </p>
        <form className="space-y-3">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Button className="w-full">Subscribe</Button>
        </form>
      </div>
    </div>
  );
};

export default ResearchDetailSidebar;
