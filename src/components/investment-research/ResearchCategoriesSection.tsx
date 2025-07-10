
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, TrendingUp, FileText, Globe } from 'lucide-react';

const ResearchCategoriesSection = () => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-cc-navy text-left dark:text-white">Our Research Coverage</h2>
      
      <Tabs defaultValue="equity" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
          <TabsTrigger value="equity" className="text-lg py-3">Equity Research</TabsTrigger>
          <TabsTrigger value="macro" className="text-lg py-3">Macro Analysis</TabsTrigger>
          <TabsTrigger value="sector" className="text-lg py-3">Sector Reports</TabsTrigger>
          <TabsTrigger value="thematic" className="text-lg py-3">Thematic Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equity" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Equity Research</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                Comprehensive coverage of listed companies across African markets with detailed financial analysis, 
                valuation models, and investment recommendations.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Company initiation reports with detailed business model analysis</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Quarterly earnings analysis and forecast updates</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Valuation models using multiple methodologies</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Buy/Hold/Sell recommendations with target prices</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Banking Sector Focus</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Deep coverage of major banks including asset quality analysis, 
                    profitability drivers, and regulatory impact assessments.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Consumer Goods Analysis</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Coverage of FMCG companies, retail chains, and consumer 
                    discretionary stocks with market share analysis.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Telecommunications Sector</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Analysis of telecom operators, mobile money growth, 
                    and digital transformation trends.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="macro" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Macroeconomic Analysis</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                Comprehensive economic research covering fiscal policy, monetary policy, and structural 
                economic trends across Ghana and West Africa.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Quarterly economic outlook reports</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Inflation and interest rate forecasts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Currency analysis and FX forecasts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Government policy impact analysis</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Economic Indicators Dashboard</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Real-time tracking of key economic indicators including 
                    GDP growth, inflation, and trade balance.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Policy Analysis</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    In-depth analysis of fiscal and monetary policy 
                    decisions and their market implications.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sector" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Sector Analysis</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                Detailed sector reports examining industry dynamics, competitive landscapes, 
                and investment opportunities across key economic sectors.
              </p>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center p-3 bg-white rounded-lg dark:bg-gray-700">
                  <div className="w-3 h-3 bg-cc-gold rounded-full mr-3"></div>
                  <span className="dark:text-gray-300">Banking & Financial Services</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg dark:bg-gray-700">
                  <div className="w-3 h-3 bg-cc-gold rounded-full mr-3"></div>
                  <span className="dark:text-gray-300">Energy & Utilities</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg dark:bg-gray-700">
                  <div className="w-3 h-3 bg-cc-gold rounded-full mr-3"></div>
                  <span className="dark:text-gray-300">Consumer Goods & Retail</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg dark:bg-gray-700">
                  <div className="w-3 h-3 bg-cc-gold rounded-full mr-3"></div>
                  <span className="dark:text-gray-300">Telecommunications</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg dark:bg-gray-700">
                  <div className="w-3 h-3 bg-cc-gold rounded-full mr-3"></div>
                  <span className="dark:text-gray-300">Mining & Resources</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Sector Performance Tracking</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Monthly sector performance reports with relative 
                    valuation analysis and investment recommendations.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Industry Deep Dives</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Comprehensive industry analysis including market 
                    sizing, competitive dynamics, and growth drivers.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="thematic" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Thematic Research</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                Forward-looking research on emerging trends, structural changes, and 
                investment themes shaping African markets.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Digital transformation and fintech adoption</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">ESG investing and sustainable finance</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">AfCFTA impact on trade and investment</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Infrastructure development opportunities</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Future of Finance in Africa</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Research on digital banking, mobile money, and 
                    cryptocurrency adoption across the continent.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-600">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium dark:text-white">Climate & ESG Investing</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Analysis of climate risks, green finance opportunities, 
                    and ESG implementation in African markets.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchCategoriesSection;
