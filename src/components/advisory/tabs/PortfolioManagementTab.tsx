
import React from 'react';
import { PieChart, ArrowRight } from 'lucide-react';

const PortfolioManagementTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="flex items-center mb-4">
          <PieChart className="h-6 w-6 text-cc-gold mr-2" />
          <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Portfolio Management</h3>
        </div>
        <p className="mb-4 dark:text-gray-300">
          Our portfolio management service offers active management of your investment assets based on your specific goals and risk tolerance. We construct diversified portfolios across asset classes, geographies, and sectors to optimize returns while managing risk.
        </p>
        <ul className="space-y-2 mb-6 dark:text-gray-300">
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Customized portfolio construction and ongoing management</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Strategic asset allocation and tactical adjustments</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Regular portfolio reviews and rebalancing</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Performance reporting and detailed analytics</span>
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        <h4 className="text-lg font-semibold mb-4 dark:text-white">Our Approach</h4>
        <p className="mb-6 dark:text-gray-300">
          We utilize a disciplined investment process that combines fundamental research with quantitative analysis to identify opportunities across global markets, focusing on:
        </p>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
              <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
            </div>
            <div>
              <h5 className="font-medium dark:text-white">Long-term Perspective</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Strategic allocations based on long-term economic and market forecasts</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
              <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
            </div>
            <div>
              <h5 className="font-medium dark:text-white">Tactical Flexibility</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Adjusting positions to capitalize on short-term market inefficiencies</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
              <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
            </div>
            <div>
              <h5 className="font-medium dark:text-white">Risk Management</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Sophisticated risk controls to protect capital in various market environments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagementTab;
