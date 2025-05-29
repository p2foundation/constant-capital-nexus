
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IntroSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Strategic Investment Solutions</h2>
        <p className="mb-6 dark:text-gray-300">
          Our Investment Advisory team provides comprehensive wealth management and investment solutions tailored to meet the unique needs of our clients. We combine deep market expertise with personalized service to help you achieve your financial objectives.
        </p>
        <p className="mb-8 dark:text-gray-300">
          Whether you're planning for retirement, building wealth, or managing institutional assets, our experienced advisors work closely with you to develop and implement strategies that align with your risk tolerance and investment goals.
        </p>
        <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
          <Link to="/contact" className="flex items-center">
            Start Your Investment Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
        <img 
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80" 
          alt="Investment Advisory Consultation" 
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default IntroSection;
