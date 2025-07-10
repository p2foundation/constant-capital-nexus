
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Handshake, ArrowUpDown, FileBarChart, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdvisorySolutionsTabs = () => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-cc-navy text-left dark:text-white">Our Advisory Solutions</h2>
      
      <Tabs defaultValue="ma" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
          <TabsTrigger value="ma" className="text-lg py-3">Mergers & Acquisitions</TabsTrigger>
          <TabsTrigger value="restructuring" className="text-lg py-3">Corporate Restructuring</TabsTrigger>
          <TabsTrigger value="valuation" className="text-lg py-3">Business Valuation</TabsTrigger>
          <TabsTrigger value="strategy" className="text-lg py-3">Corporate Strategy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ma" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          {/* M&A Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Handshake className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Mergers & Acquisitions</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                We provide end-to-end M&A advisory services, guiding clients through every stage of the transaction process to achieve their strategic objectives.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Buy-side and Sell-side Advisory</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Target Identification and Screening</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Due Diligence Coordination</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Transaction Structuring and Negotiation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Post-Merger Integration Planning</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
              <h4 className="text-lg font-semibold mb-4 dark:text-white">The M&A Process</h4>
              <p className="mb-6 dark:text-gray-300">
                Our structured approach to M&A transactions ensures comprehensive coverage of all critical aspects:
              </p>
              <div className="space-y-4">
                <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">1</div>
                  <div>
                    <h5 className="font-medium dark:text-white">Strategic Assessment</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Defining objectives and identifying opportunities</p>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">2</div>
                  <div>
                    <h5 className="font-medium dark:text-white">Transaction Preparation</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Valuation, positioning, and marketing materials</p>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">3</div>
                  <div>
                    <h5 className="font-medium dark:text-white">Due Diligence & Negotiation</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive review and deal structuring</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">4</div>
                  <div>
                    <h5 className="font-medium dark:text-white">Closing & Integration</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Transaction completion and value realization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="restructuring" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          {/* Restructuring Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <ArrowUpDown className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Corporate Restructuring</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                Our corporate restructuring services help businesses optimize their organizational structure, improve operational efficiency, and enhance financial performance.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Operational Restructuring</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Financial Restructuring</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Corporate Reorganization</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Turnaround Management</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
              <h4 className="text-lg font-semibold mb-4 dark:text-white">Case Study: Financial Services Restructuring</h4>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  We advised a major financial institution on comprehensive restructuring that resulted in:
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card className="border border-gray-200 dark:border-gray-600">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center dark:text-white">30%</CardTitle>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-300">Cost Reduction</p>
                    </CardHeader>
                  </Card>
                  <Card className="border border-gray-200 dark:border-gray-600">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center dark:text-white">40%</CardTitle>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-300">Improved EBITDA</p>
                    </CardHeader>
                  </Card>
                  <Card className="border border-gray-200 dark:border-gray-600">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center dark:text-white">5</CardTitle>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-300">Business Units Streamlined</p>
                    </CardHeader>
                  </Card>
                  <Card className="border border-gray-200 dark:border-gray-600">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center dark:text-white">18</CardTitle>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-300">Months to Completion</p>
                    </CardHeader>
                  </Card>
                </div>
                <p className="text-gray-600 mt-4 dark:text-gray-300">
                  The restructuring positioned the company for sustainable growth and improved its competitive positioning in the market.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="valuation" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          {/* Valuation Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <FileBarChart className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Business Valuation</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                Our valuation services provide clients with accurate, independent assessments of business value for various strategic purposes.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">M&A Valuations</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Capital Raising Support</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Financial Reporting Valuations</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Fairness Opinions</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Litigation Support</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
              <h4 className="text-lg font-semibold mb-4 dark:text-white">Our Valuation Approach</h4>
              <p className="mb-4 dark:text-gray-300">
                We employ multiple methodologies to establish robust, defensible valuations:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                    <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Discounted Cash Flow (DCF)</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Forward-looking analysis based on projected future cash flows</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                    <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Comparable Company Analysis</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Market-based valuation using similar public companies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                    <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Precedent Transactions</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Analysis based on similar completed transactions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                    <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Asset-Based Approach</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Valuation based on the fair market value of assets and liabilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="strategy" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          {/* Strategy Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-cc-gold mr-2" />
                <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Corporate Strategy</h3>
              </div>
              <p className="mb-4 dark:text-gray-300">
                We help businesses develop and implement effective corporate strategies that drive sustainable growth and competitive advantage.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Growth Strategy Development</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Market Entry Strategy</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Competitive Positioning</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Business Model Innovation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                  <span className="dark:text-gray-300">Digital Transformation</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
              <h4 className="text-lg font-semibold mb-4 dark:text-white">Strategic Planning Framework</h4>
              <p className="mb-6 dark:text-gray-300">
                Our strategy development process follows a structured approach:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border border-gray-200 dark:border-gray-600">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium dark:text-white">Situation Analysis</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Market assessment, competitive analysis, and internal capability review</p>
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="border border-gray-200 dark:border-gray-600">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium dark:text-white">Strategic Options</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Identification and evaluation of strategic alternatives</p>
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="border border-gray-200 dark:border-gray-600">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium dark:text-white">Strategy Formulation</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Development of strategic roadmap and initiatives</p>
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="border border-gray-200 dark:border-gray-600">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium dark:text-white">Implementation</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Execution support and performance tracking</p>
                    </CardContent>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvisorySolutionsTabs;
