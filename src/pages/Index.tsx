
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GSETicker from '@/components/GSETicker';
import Services from '@/components/Services';
import Research from '@/components/Research';
import MarketData from '@/components/MarketData';
import ClientsCarousel from '@/components/ClientsCarousel';
import Footer from '@/components/Footer';
import ThemeToggler from '@/components/ThemeToggler';
import ChatBot from '@/components/ChatBot';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  useAnalytics(); // Track page views

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Helmet>
        <title>Constant Capital - Ghana's Premier Investment Brokerage | Securities Trading & Research</title>
        <meta name="description" content="Ghana's leading SEC-licensed investment brokerage offering securities trading on GSE, investment research, strategic advisory, and capital markets services. Start investing today." />
        <meta name="keywords" content="Ghana investment, GSE trading, securities broker, investment research, capital markets Ghana, private equity, strategic advisory, SEC licensed" />
        <link rel="canonical" href="https://constantcap.com.gh/" />
      </Helmet>
      
      <Navbar />
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggler />
      </div>
      <main className="flex-1">
        <Hero />
        <GSETicker />
        <Services />
        <MarketData />
        <Research />
        <ClientsCarousel />
      </main>
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Index;
