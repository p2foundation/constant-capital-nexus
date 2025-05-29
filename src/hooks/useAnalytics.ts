
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackBusinessEvent } from '@/utils/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return {
    trackBusinessEvent,
  };
};
