
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { useAnalytics } from '@/hooks/useAnalytics';
import AdminFooter from '@/components/admin/AdminFooter';
import ResearchReportManager from '@/components/admin/ResearchReportManager';
import { AdminProvider } from '@/contexts/AdminContext';

const ResearchAdmin = () => {
  useAnalytics();
  
  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-cc-navy/95">
        <Helmet>
          <title>Research Admin | Capital Coast Research</title>
          <meta name="description" content="Manage research reports and publications" />
        </Helmet>
        
        <AdminNavbar />
        
        {/* Add padding-top to account for fixed navbar */}
        <div className="container mx-auto px-4 py-8 flex-grow pt-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cc-navy dark:text-white">Research Administration</h1>
            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Manage research reports and market insights
            </p>
          </div>
          
          <ResearchReportManager />
        </div>
        
        <AdminFooter />
      </div>
    </AdminProvider>
  );
};

export default ResearchAdmin;
