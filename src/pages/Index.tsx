
import React from 'react';
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

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
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
