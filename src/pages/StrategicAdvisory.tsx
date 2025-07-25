
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StrategicAdvisoryHero from '@/components/strategic-advisory/StrategicAdvisoryHero';
import StrategicPartnershipSection from '@/components/strategic-advisory/StrategicPartnershipSection';
import AdvisorySolutionsTabs from '@/components/strategic-advisory/AdvisorySolutionsTabs';
import IndustryExpertiseSection from '@/components/strategic-advisory/IndustryExpertiseSection';
import TestimonialSection from '@/components/strategic-advisory/TestimonialSection';
import CTASection from '@/components/strategic-advisory/CTASection';

const StrategicAdvisory = () => {
  const [strategicAdvisoryImage, setStrategicAdvisoryImage] = useState("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80");

  const handleImageGenerated = (imageUrl: string) => {
    setStrategicAdvisoryImage(imageUrl);
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Helmet>
        <title>Strategic Advisory | Corporate Finance | M&A Advisory | Constant Capital Ghana</title>
        <meta name="description" content="Strategic advisory services in Ghana including M&A advisory, corporate finance, capital raising, and business transformation. Expert guidance for growth and value creation." />
        <meta name="keywords" content="strategic advisory Ghana, M&A advisory, corporate finance Ghana, capital raising, business advisory, mergers acquisitions Ghana" />
        <link rel="canonical" href="https://constantcap.com.gh/strategic-advisory" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Strategic Advisory",
            "provider": {
              "@type": "Organization",
              "name": "Constant Capital (Ghana) Limited"
            },
            "description": "Strategic advisory services including M&A, corporate finance, and business transformation",
            "areaServed": "Ghana"
          })}
        </script>
      </Helmet>
      <Navbar />
      <div className="pt-16">
        <StrategicAdvisoryHero />
        
        <div className="container mx-auto px-4 py-12">
          <StrategicPartnershipSection 
            strategicAdvisoryImage={strategicAdvisoryImage}
            onImageGenerated={handleImageGenerated}
          />
          
          <AdvisorySolutionsTabs />
          
          <IndustryExpertiseSection />
          
          <TestimonialSection />
          
          <CTASection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StrategicAdvisory;
