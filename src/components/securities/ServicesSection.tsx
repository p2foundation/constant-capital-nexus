
import React from 'react';
import { TrendingUp } from 'lucide-react';

const ServicesSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Our Trading Services</h2>
      <p className="mb-6 dark:text-gray-300">
        Our Securities Trading division offers comprehensive trading services across multiple asset classes, providing our clients with access to the Ghana Stock Exchange and other African markets. Our experienced team of traders combines deep market knowledge with advanced execution technologies to deliver optimal results.
      </p>
      <p className="mb-6 dark:text-gray-300">
        We provide institutional and corporate clients with competitive commission rates, efficient trade execution, and valuable market insights to help them make informed investment decisions.
      </p>
      
      <h3 className="text-2xl font-bold mt-10 mb-4 text-cc-navy dark:text-white">Markets We Cover</h3>
      <ul className="space-y-3 dark:text-gray-300">
        <li className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
          <span>Ghana Stock Exchange (GSE)</span>
        </li>
        <li className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
          <span>Nigerian Stock Exchange (NGX)</span>
        </li>
        <li className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
          <span>Johannesburg Stock Exchange (JSE)</span>
        </li>
        <li className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
          <span>Nairobi Securities Exchange (NSE)</span>
        </li>
        <li className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
          <span>Egyptian Exchange (EGX)</span>
        </li>
      </ul>
    </div>
  );
};

export default ServicesSection;
