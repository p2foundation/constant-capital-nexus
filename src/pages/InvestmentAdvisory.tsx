
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/advisory/HeroSection';
import IntroSection from '@/components/advisory/IntroSection';
import ServiceTabs from '@/components/advisory/ServiceTabs';
import WhyChooseUsSection from '@/components/advisory/WhyChooseUsSection';
import TestimonialSection from '@/components/advisory/TestimonialSection';
import CTASection from '@/components/advisory/CTASection';

const InvestmentAdvisory = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Helmet>
        <title>Investment Advisory Services | Portfolio Management | Constant Capital Ghana</title>
        <meta name="description" content="Tailored investment advisory services in Ghana. Expert portfolio management, financial planning, and investment strategies for institutional and individual clients." />
        <meta name="keywords" content="investment advisory Ghana, portfolio management, financial planning Ghana, wealth management, investment strategy, asset management Ghana" />
        <link rel="canonical" href="https://constantcap.com.gh/investment-advisory" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Investment Advisory",
            "provider": {
              "@type": "Organization",
              "name": "Constant Capital (Ghana) Limited"
            },
            "description": "Tailored investment strategies and portfolio management services",
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
          {/* Strategic Investment Solutions */}
          <IntroSection />
          
          {/* Services Tabs */}
          <ServiceTabs />
          
          {/* Why Choose Us */}
          <WhyChooseUsSection />
          
          {/* Client Testimonial */}
          <TestimonialSection />
          
          {/* CTA Section */}
          <CTASection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvestmentAdvisory;
