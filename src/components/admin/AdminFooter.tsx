
import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-cc-navy border-t border-gray-200 dark:border-gray-800 py-3 px-4 mt-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="text-gray-500 dark:text-gray-400">
          &copy; {currentYear} Constant Capital (Ghana) Limited. All rights reserved.
        </div>
        
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link to="#" className="text-gray-500 hover:text-cc-gold dark:text-gray-400 dark:hover:text-cc-gold transition-colors">
            Terms
          </Link>
          <Link to="#" className="text-gray-500 hover:text-cc-gold dark:text-gray-400 dark:hover:text-cc-gold transition-colors">
            Privacy
          </Link>
          <Link to="#" className="text-gray-500 hover:text-cc-gold dark:text-gray-400 dark:hover:text-cc-gold transition-colors">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
