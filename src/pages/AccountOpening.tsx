
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AccountOpeningForm from '@/components/account-opening/AccountOpeningForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { trackBusinessEvent } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';

const AccountOpening = () => {
  const { trackBusinessEvent: trackEvent } = useAnalytics();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      // Track when someone starts the account opening process
      trackBusinessEvent.accountOpeningStart();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cc-navy mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm py-4 dark:bg-cc-navy/90 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link to="/" className="flex items-center">
              {/* Light theme logo */}
              <img 
                src="/lovable-uploads/7093d63c-ec73-43af-bf87-dc91b23c81a8.png" 
                alt="Constant Capital" 
                className="h-8 w-auto dark:hidden"
              />
              {/* Dark theme logo */}
              <img 
                src="/lovable-uploads/c05b6b3d-673c-43cd-92c1-ce160b898d22.png" 
                alt="Constant Capital" 
                className="h-8 w-auto hidden dark:block"
              />
            </Link>
            <Link to="/" className="text-cc-navy hover:text-cc-blue flex items-center dark:text-white dark:hover:text-cc-gold">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
        
        {/* Authentication Required Message */}
        <div className="flex-1 py-8 pt-24 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 dark:bg-cc-navy dark:border-gray-800">
              <LogIn className="h-16 w-16 text-cc-navy dark:text-cc-gold mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-cc-navy dark:text-white mb-4">
                Sign In Required
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please sign in to your account to access the CSD account opening and KYC process. 
                Your progress will be automatically saved so you can continue at your convenience.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-cc-navy hover:bg-cc-blue text-white"
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="w-full"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border-t border-gray-100 py-4 text-center text-sm text-gray-500 dark:bg-cc-navy/90 dark:border-gray-800 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Constant Capital (Ghana) Limited
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm py-4 dark:bg-cc-navy/90 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            {/* Light theme logo */}
            <img 
              src="/lovable-uploads/7093d63c-ec73-43af-bf87-dc91b23c81a8.png" 
              alt="Constant Capital" 
              className="h-8 w-auto dark:hidden"
            />
            {/* Dark theme logo */}
            <img 
              src="/lovable-uploads/c05b6b3d-673c-43cd-92c1-ce160b898d22.png" 
              alt="Constant Capital" 
              className="h-8 w-auto hidden dark:block"
            />
          </Link>
          <Link to="/" className="text-cc-navy hover:text-cc-blue flex items-center dark:text-white dark:hover:text-cc-gold">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Main Content with top padding to account for fixed header */}
      <div className="flex-1 py-8 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 dark:bg-cc-navy dark:border-gray-800">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-cc-navy dark:text-white mb-2">
                  Open Your Investment Account
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete your CSD account opening and KYC process online. Your progress is automatically saved.
                </p>
              </div>
              
              <AccountOpeningForm />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-100 py-4 text-center text-sm text-gray-500 dark:bg-cc-navy/90 dark:border-gray-800 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Constant Capital (Ghana) Limited
      </div>
    </div>
  );
};

export default AccountOpening;
