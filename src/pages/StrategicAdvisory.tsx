
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, Handshake, Users, FileBarChart, Building, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StrategicAdvisory = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-cc-navy text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Strategic Advisory</h1>
              <p className="text-lg md:text-xl mb-8">
                Expert guidance on mergers, acquisitions, corporate restructuring, and strategic business initiatives.
              </p>
              <div className="flex items-center">
                <Handshake className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Trusted advisors for transformational business decisions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Strategic Partnership</h2>
              <p className="mb-6 dark:text-gray-300">
                Our Strategic Advisory practice partners with businesses to navigate complex strategic decisions that reshape their future. From mergers and acquisitions to corporate restructuring and business transformation, we provide the expertise and guidance needed to achieve optimal outcomes.
              </p>
              <p className="mb-8 dark:text-gray-300">
                With deep industry knowledge and extensive transaction experience across Ghana and broader African markets, our advisory team works closely with clients to develop and execute strategies that create sustainable value and competitive advantage.
              </p>
              <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
                <Link to="/contact" className="flex items-center">
                  Discuss Your Strategic Needs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
              <img 
                src="/lovable-uploads/3722b840-57e0-4fc4-8378-9ee194fd4491.png" 
                alt="Strategic Advisory" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Advisory Services */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Our Advisory Solutions</h2>
            
            <Tabs defaultValue="ma" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="ma" className="text-lg py-3">Mergers & Acquisitions</TabsTrigger>
                <TabsTrigger value="restructuring" className="text-lg py-3">Corporate Restructuring</TabsTrigger>
                <TabsTrigger value="valuation" className="text-lg py-3">Business Valuation</TabsTrigger>
                <TabsTrigger value="strategy" className="text-lg py-3">Corporate Strategy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ma" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
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
          
          {/* Industry Expertise */}
          <div className="my-16 bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Industry Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Financial Services</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Extensive experience advising banks, insurance companies, and fintech firms on strategic initiatives and transactions.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Bank mergers and acquisitions</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Insurance company restructuring</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Fintech growth strategies</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Energy & Resources</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Strategic advisory for traditional energy companies, renewable energy projects, and mining operations.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Oil and gas asset transactions</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Renewable energy market entry</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Mining company restructuring</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Consumer & Retail</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Advisory services for consumer goods companies, retailers, and e-commerce businesses.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Retail expansion strategies</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Consumer brand acquisitions</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>E-commerce transformation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Technology & Telecom</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Strategic guidance for technology companies, telecom operators, and media businesses.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Tech company growth strategies</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Telecom infrastructure transactions</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Digital media partnerships</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Healthcare & Pharma</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Advisory services for healthcare providers, pharmaceutical companies, and medical device manufacturers.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Hospital group consolidation</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Pharmaceutical market entry</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Healthcare innovation strategies</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Agriculture & Food</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Strategic guidance for agricultural businesses, food processors, and agtech companies.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Agribusiness expansion</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Food processing integration</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Sustainable agriculture ventures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="my-16">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-cc-gold dark:bg-gray-700 dark:border-cc-gold">
              <div className="flex flex-col items-center text-center">
                <blockquote className="italic text-lg mb-6 dark:text-white">
                  "The strategic advisory team at Constant Capital provided invaluable guidance during our company's transformational acquisition. Their deep industry knowledge and transaction expertise were instrumental in navigating a complex process and ensuring a successful outcome."
                </blockquote>
                <div className="font-medium text-cc-navy dark:text-cc-gold">
                  — CEO, Leading Ghanaian Manufacturing Company
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our strategic advisory team is ready to help you navigate complex business challenges and capitalize on opportunities for growth and value creation.
            </p>
            <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold text-lg px-8 py-6">
              <Link to="/contact" className="flex items-center">
                Schedule a Strategy Session <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StrategicAdvisory;
