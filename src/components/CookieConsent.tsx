
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-cc-gold/10 rounded-full flex-shrink-0">
            <Cookie className="h-5 w-5 text-cc-gold" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-cc-navy dark:text-white mb-1">
                  We use cookies
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies.{' '}
                  <Link to="/cookie-policy" className="text-cc-blue hover:underline">
                    Learn more
                  </Link>
                </p>
              </div>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                onClick={handleAccept}
                size="sm"
                className="bg-cc-navy hover:bg-cc-navy/90 text-white dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/90"
              >
                Accept All
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                size="sm"
                className="border-gray-300 dark:border-gray-600"
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
