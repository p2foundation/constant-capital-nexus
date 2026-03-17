
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import FXHeroSection from '@/components/fx-trading/FXHeroSection';
import FXLiveTicker from '@/components/fx-trading/FXLiveTicker';
import FXServicesGrid from '@/components/fx-trading/FXServicesGrid';
import FXWhyChooseUs from '@/components/fx-trading/FXWhyChooseUs';
import FXCTASection from '@/components/fx-trading/FXCTASection';

const FXTrading = () => {
  useAnalytics();
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Helmet>
        <title>FX Trading Services | Foreign Exchange | Constant Capital</title>
        <meta name="description" content="Licensed FX trading services in Ghana. Competitive exchange rates, institutional trading, hedging solutions, and expert forex advisory for businesses and institutions." />
        <meta name="keywords" content="FX trading Ghana, forex trading, foreign exchange, currency trading, hedging solutions, institutional forex, Ghana forex broker" />
        <link rel="canonical" href="https://constantcap.com.gh/fx-trading" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "FX Trading Services",
            "provider": {
              "@type": "Organization",
              "name": "Constant Capital (Ghana) Limited"
            },
            "description": "Licensed foreign exchange trading services for institutional and corporate clients",
            "areaServed": "Ghana"
          })}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <FXHeroSection />
        <FXLiveTicker />
        <FXServicesGrid />
        <FXWhyChooseUs />
        <FXCTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default FXTrading;
