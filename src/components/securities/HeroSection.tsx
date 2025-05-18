
import React from 'react';
import { ChartLine } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-cc-navy text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Securities Trading</h1>
          <p className="text-lg md:text-xl mb-8">
            Access global markets with our advanced trading solutions and expert execution services.
          </p>
          <div className="flex items-center">
            <ChartLine className="h-6 w-6 mr-2 text-cc-gold" />
            <p className="font-medium">Trusted by leading institutions and individual investors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
