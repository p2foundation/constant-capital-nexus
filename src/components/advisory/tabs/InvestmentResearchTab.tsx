
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InvestmentResearchTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 text-cc-gold mr-2" />
          <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Investment Research</h3>
        </div>
        <p className="mb-4 dark:text-gray-300">
          Our investment research provides in-depth analysis and insights to inform your investment decisions. Our team of analysts monitors global markets, economic trends, and individual securities to identify opportunities and risks.
        </p>
        <ul className="space-y-2 mb-6 dark:text-gray-300">
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Equity research and stock recommendations</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Fixed income and credit analysis</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Macroeconomic forecasts and market commentary</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
            <span>Thematic research and emerging trends</span>
          </li>
        </ul>
        <Button variant="outline" className="border-cc-navy text-cc-navy hover:bg-cc-navy hover:text-white dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold dark:hover:text-cc-navy">
          <Link to="/research" className="flex items-center">
            View Research Reports <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        <h4 className="text-lg font-semibold mb-4 dark:text-white">Research Coverage</h4>
        <p className="mb-6 dark:text-gray-300">
          Our research team provides comprehensive coverage across markets and asset classes:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600 dark:bg-gray-800/50">
            <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Equities</h5>
            <ul className="text-sm space-y-2 dark:text-gray-300">
              <li>• Ghana Stock Exchange</li>
              <li>• Nigeria Stock Exchange</li>
              <li>• Kenya Stock Exchange</li>
              <li>• South Africa JSE</li>
            </ul>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600 dark:bg-gray-800/50">
            <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Fixed Income</h5>
            <ul className="text-sm space-y-2 dark:text-gray-300">
              <li>• Government Securities</li>
              <li>• Corporate Bonds</li>
              <li>• Eurobonds</li>
              <li>• Money Market</li>
            </ul>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600 dark:bg-gray-800/50">
            <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Alternative Investments</h5>
            <ul className="text-sm space-y-2 dark:text-gray-300">
              <li>• Real Estate</li>
              <li>• Private Equity</li>
              <li>• Infrastructure</li>
            </ul>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600 dark:bg-gray-800/50">
            <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Macro Analysis</h5>
            <ul className="text-sm space-y-2 dark:text-gray-300">
              <li>• Economic Indicators</li>
              <li>• Policy Analysis</li>
              <li>• Currency Forecasts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentResearchTab;
