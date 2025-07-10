
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-cc-navy text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Research</h1>
          <p className="text-lg md:text-xl mb-8">
            Comprehensive market intelligence and analysis to guide your investment decisions across Ghana and African markets.
          </p>
          <div className="flex items-center mb-8">
            <LineChart className="h-6 w-6 mr-2 text-cc-gold" />
            <p className="font-medium">Expert analysis backed by deep local market knowledge</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold">
              <Link to="/research" className="flex items-center">
                Access Research Reports <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="border-white text-cc-navy hover:bg-white hover:text-cc-navy">
              <Link to="/contact" className="flex items-center">
                Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
