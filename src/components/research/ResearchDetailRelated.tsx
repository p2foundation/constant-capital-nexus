
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const ResearchDetailRelated = () => {
  return (
    <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-6">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <FileText className="h-4 w-4" /> Related Research
      </h3>
      <ul className="space-y-1">
        <li>
          <Link to="/research/fixed-income-weekly" className="text-cc-blue hover:underline dark:text-cc-gold">
            West African Fixed Income Weekly
          </Link>
        </li>
        <li>
          <Link to="/research/ghana-cedi-outlook" className="text-cc-blue hover:underline dark:text-cc-gold">
            Ghana Cedi Outlook: Q2 2025
          </Link>
        </li>
        <li>
          <Link to="/research/equity-analysis" className="text-cc-blue hover:underline dark:text-cc-gold">
            Ghana Banking Sector Outlook 2025
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ResearchDetailRelated;
