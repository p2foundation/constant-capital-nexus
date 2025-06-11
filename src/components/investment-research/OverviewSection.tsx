
import React from 'react';

const OverviewSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Research Excellence</h2>
        <p className="mb-6 dark:text-gray-300">
          Our Investment Research division provides institutional-quality analysis across African capital markets. 
          We combine rigorous fundamental analysis with deep local market insights to deliver actionable 
          investment recommendations.
        </p>
        <p className="mb-8 dark:text-gray-300">
          From equity research to macroeconomic analysis, our team of experienced analysts covers key 
          sectors and markets across Ghana and the broader African continent, helping clients identify 
          opportunities and manage risks in dynamic emerging markets.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
            <div className="text-2xl font-bold text-cc-navy dark:text-cc-gold">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Companies Covered</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
            <div className="text-2xl font-bold text-cc-navy dark:text-cc-gold">15+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Sectors Analyzed</div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
        <img 
          src="/lovable-uploads/749a8bb6-9f9d-4731-8233-2a3459f75e84.png" 
          alt="Investment Research" 
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
};

export default OverviewSection;
