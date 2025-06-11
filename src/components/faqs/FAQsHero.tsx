
import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQsHero = () => {
  return (
    <div className="bg-cc-navy text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <HelpCircle className="h-16 w-16 text-cc-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl mb-8">
            Find answers to common questions about our services, account opening process, 
            trading platforms, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQsHero;
