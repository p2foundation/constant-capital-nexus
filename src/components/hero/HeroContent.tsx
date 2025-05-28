
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroContent = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cc-navy dark:text-white leading-tight mb-6">
        Ghana's Premier <span className="text-gradient">Investment</span> Brokerage
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Constant Capital provides institutional and individual investors with 
        superior market research and execution across West African and international markets.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-cc-navy hover:bg-cc-blue text-white dark:bg-cc-gold dark:hover:bg-cc-gold/90 px-6 py-6 rounded-md flex items-center justify-center">
          <Link to="/account-opening">
            Open an Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="border-cc-blue text-cc-blue dark:border-cc-gold dark:text-cc-gold hover:bg-cc-light-blue dark:hover:bg-cc-navy/50 px-6 py-6 rounded-md">
          <Link to="/about">Learn More</Link>
        </Button>
      </div>
      
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">10+</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Years Experience</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">300+</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Clients</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">₵2B+</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Assets Managed</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">SEC</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Regulated</div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
