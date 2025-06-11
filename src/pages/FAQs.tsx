
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQsHero from '@/components/faqs/FAQsHero';
import FAQsContent from '@/components/faqs/FAQsContent';

const FAQs = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
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
