
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/securities/HeroSection';
import ServicesSection from '@/components/securities/ServicesSection';
import WhyChooseUsSection from '@/components/securities/WhyChooseUsSection';
import TestimonialSection from '@/components/securities/TestimonialSection';

const SecuritiesTrading = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
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
