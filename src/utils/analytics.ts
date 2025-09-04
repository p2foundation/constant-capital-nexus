
// Google Analytics utility
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-61N6JDY12W';

// Initialize Google Analytics
export const initGA = () => {
  // Create and load the Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Configure Google Analytics
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log('Google Analytics initialized with tracking ID:', GA_TRACKING_ID);
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });
    console.log('GA Page View Tracked:', { url, title: title || document.title });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log('GA Event Tracked:', { action, category, label, value });
  }
};

// Track specific business events
export const trackBusinessEvent = {
  // Research interactions
  researchDownload: (reportType: string) => {
    trackEvent('download', 'research', reportType);
  },
  
  researchView: (reportId: string, reportTitle: string) => {
    trackEvent('view', 'research', `${reportId}: ${reportTitle}`);
  },

  // Account opening
  accountOpeningStart: () => {
    trackEvent('start', 'account_opening');
  },

  accountOpeningComplete: () => {
    trackEvent('complete', 'account_opening');
  },

  // Login/Auth
  login: (method: string = 'email') => {
    trackEvent('login', 'auth', method);
  },

  register: (method: string = 'email') => {
    trackEvent('register', 'auth', method);
  },

  // Navigation
  externalLinkClick: (url: string) => {
    trackEvent('click', 'external_link', url);
  },

  calculatorUse: (calculatorType: string) => {
    trackEvent('use', 'calculator', calculatorType);
  },

  // Contact and engagement
  contactFormSubmit: () => {
    trackEvent('submit', 'contact_form');
  },

  newsletterSubscribe: () => {
    trackEvent('subscribe', 'newsletter');
  },

  // International market tracking
  internationalClientInquiry: (country: string) => {
    trackEvent('inquiry', 'international_client', country);
  },

  africanMarketInterest: (market: string) => {
    trackEvent('interest', 'african_markets', market);
  },

  crossBorderTransaction: (fromCountry: string, toCountry: string) => {
    trackEvent('transaction', 'cross_border', `${fromCountry}_to_${toCountry}`);
  },

  multiCurrencyAccountOpen: (currencies: string) => {
    trackEvent('open', 'multi_currency_account', currencies);
  },

  internationalResearchDownload: (reportType: string, userCountry: string) => {
    trackEvent('download', 'international_research', `${reportType}_${userCountry}`);
  }
};
