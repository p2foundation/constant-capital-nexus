
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
          Our Investment Advisory practice offers comprehensive, personalized strategies designed to meet your specific financial objectives. Whether you're an institutional client or a high-net-worth individual, our team of experienced advisors combines deep market knowledge with sophisticated analytics to develop solutions tailored to your unique needs.
        </p>
        <p className="mb-8 dark:text-gray-300">
          We take a holistic approach to wealth management, considering your complete financial picture including growth targets, risk tolerance, time horizon, and liquidity requirements. Our advisors maintain close relationships with clients, providing ongoing support and adjusting strategies as market conditions and personal circumstances evolve.
        </p>
        <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/90">
          <Link to="/contact" className="flex items-center">
            Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
        <img 
          src="/lovable-uploads/d6c6d4c9-dd0e-488b-a267-64e2fe8ca8a6.png" 
          alt="Investment Advisory Meeting" 
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default IntroSection;
