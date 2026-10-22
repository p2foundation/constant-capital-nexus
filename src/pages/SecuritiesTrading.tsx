
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import { useAnalytics } from '@/hooks/useAnalytics';
import Footer from '@/components/Footer';
import HeroSection from '@/components/securities/HeroSection';
import ServicesSection from '@/components/securities/ServicesSection';
import WhyChooseUsSection from '@/components/securities/WhyChooseUsSection';
import TestimonialSection from '@/components/securities/TestimonialSection';

const SecuritiesTrading = () => {
  useAnalytics();
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-background">
      <Helmet>
        <title>Securities Trading | Ghana Stock Exchange Trading | Constant Capital</title>
        <meta name="description" content="SEC-licensed securities trading and primary-dealer access for individual and institutional investors across Ghanaian and African markets." />
        <meta name="keywords" content="Ghana securities trading, GSE trading, Ghana Stock Exchange, equity trading Ghana, securities broker Ghana, individual investor services, institutional trading, primary dealer Ghana" />
        <link rel="canonical" href="https://constantcap.com.gh/securities-trading" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Securities Trading",
            "provider": {
              "@type": "Organization",
              "name": "Constant Capital (Ghana) Limited"
            },
            "description": "Professional trading services for Ghana Stock Exchange and African markets",
            "areaServed": "Ghana"
          })}
        </script>
      </Helmet>
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ServicesSection />
            <WhyChooseUsSection />
          </div>
          
          {/* Client Testimonial */}
          <TestimonialSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SecuritiesTrading;
