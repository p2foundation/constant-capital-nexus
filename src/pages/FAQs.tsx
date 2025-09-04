
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import FAQsHero from '@/components/faqs/FAQsHero';
import FAQsContent from '@/components/faqs/FAQsContent';

const FAQs = () => {
  useAnalytics();
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Helmet>
        <title>Frequently Asked Questions | Investment Services FAQ | Constant Capital</title>
        <meta name="description" content="Find answers to common questions about our investment services, trading accounts, research reports, and how to get started with Constant Capital Ghana." />
        <meta name="keywords" content="investment FAQ Ghana, trading questions, securities FAQ, investment services help, Ghana Stock Exchange questions" />
        <link rel="canonical" href="https://constantcap.com.gh/faqs" />
      </Helmet>
      <Navbar />
      <div className="pt-16">
        <FAQsHero />
        <div className="container mx-auto px-4 py-12">
          <FAQsContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
