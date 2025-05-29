import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import ResearchContent from '@/components/research/ResearchContent';
import ResearchSidebar from '@/components/research/ResearchSidebar';
import { useAnalytics } from '@/hooks/useAnalytics';

const ResearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const defaultTab = queryParams.get('tab') || 'featured';
  const currentPage = parseInt(queryParams.get('page') || '1', 10);
  
  useAnalytics(); // Track page views

  useEffect(() => {
    const tab = queryParams.get('tab');
    if (!tab || !['featured', 'equities', 'fixedincome', 'macroeconomic'].includes(tab)) {
      // Set default tab if invalid
      navigate('/research?tab=featured&page=1', { replace: true });
    }
    
    // Ensure page parameter is valid
    const pageParam = queryParams.get('page');
    if (!pageParam || isNaN(parseInt(pageParam, 10)) || parseInt(pageParam, 10) < 1) {
      // Keep current tab but set page to 1
      queryParams.set('page', '1');
      navigate(`/research?${queryParams.toString()}`, { replace: true });
    }
  }, [queryParams, navigate]);

  const handleTabChange = (value: string) => {
    navigate(`/research?tab=${value}&page=1`);
  };

  const handlePageChange = (page: number) => {
    queryParams.set('page', page.toString());
    navigate(`/research?${queryParams.toString()}`);
  };

  // Format a date string for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cc-navy dark:text-white">Research Portal</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access premier market research, analysis and investment insights from Constant Capital's research team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ResearchContent 
                currentTab={defaultTab}
                currentPage={currentPage}
                onTabChange={handleTabChange}
                onPageChange={handlePageChange}
                formatDate={formatDate}
              />
            </div>

            <div className="lg:col-span-1">
              <ResearchSidebar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearchPage;
