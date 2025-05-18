
import React from 'react';
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
