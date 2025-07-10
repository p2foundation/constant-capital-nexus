
import React from 'react';
import { PieChart, LineChart, BarChart3, Briefcase } from 'lucide-react';

const WhyChooseUsSection = () => {
  return (
    <div className="my-16 bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-cc-navy text-left dark:text-white">Why Choose Our Advisory Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
          <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/10">
            <PieChart className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">Expertise & Experience</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our advisors average 15+ years of investment experience across multiple market cycles.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
          <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/10">
            <LineChart className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">Tailored Solutions</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Customized strategies designed for your unique financial goals and circumstances.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
          <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/10">
            <BarChart3 className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">Research-Driven</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Investment decisions backed by rigorous analysis and proprietary research.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
          <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/10">
            <Briefcase className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">Client Focus</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Dedicated advisors providing personalized attention and responsive service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
