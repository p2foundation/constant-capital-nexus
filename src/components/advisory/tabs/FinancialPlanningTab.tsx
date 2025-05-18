
import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

const FinancialPlanningTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="flex items-center mb-4">
          <Briefcase className="h-6 w-6 text-cc-gold mr-2" />
          <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Financial Planning</h3>
        </div>
        <p className="mb-4 dark:text-gray-300">
          Our comprehensive financial planning service helps you create a roadmap to achieve your short and long-term financial goals. We analyze your current financial situation and develop strategies tailored to your specific needs.
        </p>
        <ul className="space-y-2 mb-6 dark:text-gray-300">
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Retirement planning and pension optimization</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Estate planning and wealth transfer strategies</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Tax efficiency planning for investments</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Liquidity management and cash flow analysis</span>
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        <h4 className="text-lg font-semibold mb-4 dark:text-white">Planning Process</h4>
        <p className="mb-6 dark:text-gray-300">
          Our financial planning process is designed to be comprehensive, collaborative, and adaptive to changing circumstances:
        </p>
        <div className="space-y-4">
          <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-600">
            <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">1</div>
            <div>
              <h5 className="font-medium dark:text-white">Discovery & Goal Setting</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Understanding your financial situation, objectives, and priorities</p>
            </div>
          </div>
          <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-600">
            <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">2</div>
            <div>
              <h5 className="font-medium dark:text-white">Strategy Development</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Creating tailored strategies aligned with your goals</p>
            </div>
          </div>
          <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-600">
            <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">3</div>
            <div>
              <h5 className="font-medium dark:text-white">Implementation</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Executing recommendations across various financial aspects</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">4</div>
            <div>
              <h5 className="font-medium dark:text-white">Monitoring & Review</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Regular reviews and adjustments as circumstances change</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPlanningTab;
