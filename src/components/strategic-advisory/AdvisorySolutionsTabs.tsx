
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Handshake, ArrowUpDown, FileBarChart, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdvisorySolutionsTabs = () => {
  return (
    <div className="my-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Solutions</p>
      <h2 className="font-heading mb-4 text-3xl font-bold mb-8 text-foreground font-heading">Our Advisory Solutions</h2>
      
      <Tabs defaultValue="ma" className="w-full">
        <TabsList className="mb-8 grid h-auto w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="ma" className="py-3 text-base">Mergers & Acquisitions</TabsTrigger>
          <TabsTrigger value="restructuring" className="py-3 text-base">Corporate Restructuring</TabsTrigger>
          <TabsTrigger value="valuation" className="py-3 text-base">Business Valuation</TabsTrigger>
          <TabsTrigger value="strategy" className="py-3 text-base">Corporate Strategy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ma" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          {/* M&A Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Handshake className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Mergers & Acquisitions</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                We provide end-to-end M&A advisory services, guiding clients through every stage of the transaction process to achieve their strategic objectives.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Buy-side and Sell-side Advisory</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Target Identification and Screening</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Due Diligence Coordination</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Transaction Structuring and Negotiation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Post-Merger Integration Planning</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h4 className="text-lg font-semibold mb-4 ">The M&A Process</h4>
              <p className="mb-6 text-muted-foreground">
                Our structured approach to M&A transactions ensures comprehensive coverage of all critical aspects:
              </p>
              <div className="space-y-4">
                <div className="flex items-center border-b border-border pb-4">
                  <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ">1</div>
                  <div>
                    <h5 className="font-medium ">Strategic Assessment</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Defining objectives and identifying opportunities</p>
                  </div>
                </div>
                <div className="flex items-center border-b border-border pb-4">
                  <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ">2</div>
                  <div>
                    <h5 className="font-medium ">Transaction Preparation</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Valuation, positioning, and marketing materials</p>
                  </div>
                </div>
                <div className="flex items-center border-b border-border pb-4">
                  <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ">3</div>
                  <div>
                    <h5 className="font-medium ">Due Diligence & Negotiation</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Comprehensive review and deal structuring</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ">4</div>
                  <div>
                    <h5 className="font-medium ">Closing & Integration</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Transaction completion and value realization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="restructuring" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          {/* Restructuring Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <ArrowUpDown className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Corporate Restructuring</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Our corporate restructuring services help businesses optimize their organizational structure, improve operational efficiency, and enhance financial performance.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Operational Restructuring</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Financial Restructuring</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Corporate Reorganization</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Turnaround Management</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h4 className="text-lg font-semibold mb-4 ">Case Study: Financial Services Restructuring</h4>
              <div className="space-y-4">
                <p className="text-gray-600 text-muted-foreground">
                  We advised a major financial institution on comprehensive restructuring that resulted in:
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card className="border border-border">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center ">30%</CardTitle>
                      <p className="text-sm text-center text-gray-600 text-muted-foreground">Cost Reduction</p>
                    </CardHeader>
                  </Card>
                  <Card className="border border-border">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center ">40%</CardTitle>
                      <p className="text-sm text-center text-gray-600 text-muted-foreground">Improved EBITDA</p>
                    </CardHeader>
                  </Card>
                  <Card className="border border-border">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center ">5</CardTitle>
                      <p className="text-sm text-center text-gray-600 text-muted-foreground">Business Units Streamlined</p>
                    </CardHeader>
                  </Card>
                  <Card className="border border-border">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base text-center ">18</CardTitle>
                      <p className="text-sm text-center text-gray-600 text-muted-foreground">Months to Completion</p>
                    </CardHeader>
                  </Card>
                </div>
                <p className="text-gray-600 mt-4 text-muted-foreground">
                  The restructuring positioned the company for sustainable growth and improved its competitive positioning in the market.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="valuation" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          {/* Valuation Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <FileBarChart className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Business Valuation</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Our valuation services provide clients with accurate, independent assessments of business value for various strategic purposes.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">M&A Valuations</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Capital Raising Support</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Financial Reporting Valuations</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Fairness Opinions</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Litigation Support</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h4 className="text-lg font-semibold mb-4 ">Our Valuation Approach</h4>
              <p className="mb-4 text-muted-foreground">
                We employ multiple methodologies to establish robust, defensible valuations:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-accent p-2 rounded-full mr-3 shrink-0">
                    <ArrowRight className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h5 className="font-medium ">Discounted Cash Flow (DCF)</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Forward-looking analysis based on projected future cash flows</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent p-2 rounded-full mr-3 shrink-0">
                    <ArrowRight className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h5 className="font-medium ">Comparable Company Analysis</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Market-based valuation using similar public companies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent p-2 rounded-full mr-3 shrink-0">
                    <ArrowRight className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h5 className="font-medium ">Precedent Transactions</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Analysis based on similar completed transactions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent p-2 rounded-full mr-3 shrink-0">
                    <ArrowRight className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h5 className="font-medium ">Asset-Based Approach</h5>
                    <p className="text-sm text-gray-600 text-muted-foreground">Valuation based on the fair market value of assets and liabilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="strategy" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          {/* Strategy Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Corporate Strategy</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                We help businesses develop and implement effective corporate strategies that drive sustainable growth and competitive advantage.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Growth Strategy Development</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Market Entry Strategy</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Competitive Positioning</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Business Model Innovation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Digital Transformation</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h4 className="text-lg font-semibold mb-4 ">Strategic Planning Framework</h4>
              <p className="mb-6 text-muted-foreground">
                Our strategy development process follows a structured approach:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border border-border">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium ">Situation Analysis</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 text-muted-foreground">Market assessment, competitive analysis, and internal capability review</p>
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="border border-border">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium ">Strategic Options</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 text-muted-foreground">Identification and evaluation of strategic alternatives</p>
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="border border-border">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium ">Strategy Formulation</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 text-muted-foreground">Development of strategic roadmap and initiatives</p>
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="border border-border">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium ">Implementation</CardTitle>
                    <CardContent className="p-0 pt-2">
                      <p className="text-sm text-gray-600 text-muted-foreground">Execution support and performance tracking</p>
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
