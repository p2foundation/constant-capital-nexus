
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAnalytics } from '@/hooks/useAnalytics';
import ResearchReportManager from '@/components/admin/ResearchReportManager';
import AdminShell from '@/components/admin/AdminShell';

const ResearchAdmin = () => {
  useAnalytics();
  
  return (
      <>
        <Helmet>
          <title>Research Admin | Capital Coast Research</title>
          <meta name="description" content="Manage research reports and publications" />
        </Helmet>
        
        <AdminShell active="research">
          <ResearchReportManager />
        </AdminShell>
      </>
  );
};

export default ResearchAdmin;
