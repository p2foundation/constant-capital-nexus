
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, BarChart3, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResearchServices = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-cc-navy text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Research</h1>
              <p className="text-lg md:text-xl mb-8">
                In-depth analysis and insights into market trends, equity performance, and economic developments across Ghana and Africa.
              </p>
              <div className="flex items-center">
                <LineChart className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Expert analysis to inform your investment decisions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Research Excellence</h2>
              <p className="mb-6 dark:text-gray-300">
                Our Investment Research team delivers comprehensive market intelligence and analysis to help clients navigate complex financial markets. With a focus on Ghana and broader African markets, our research combines macroeconomic insights with detailed company analysis to identify investment opportunities and risks.
              </p>
              <p className="mb-8 dark:text-gray-300">
                Led by experienced analysts with deep sector expertise, our research covers equities, fixed income, commodities, and currencies, providing you with the information needed to make informed investment decisions in rapidly evolving markets.
              </p>
              <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
                <Link to="/research" className="flex items-center">
                  View Our Research <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
              <img 
                src="/lovable-uploads/749a8bb6-9f9d-4731-8233-2a3459f75e84.png" 
                alt="Investment Research" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Research Categories */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Our Research Coverage</h2>
            
            <Tabs defaultValue="equity" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="equity" className="text-lg py-3">Equity Research</TabsTrigger>
                <TabsTrigger value="macro" className="text-lg py-3">Macroeconomic Analysis</TabsTrigger>
                <TabsTrigger value="sector" className="text-lg py-3">Sector Reports</TabsTrigger>
                <TabsTrigger value="thematic" className="text-lg py-3">Thematic Research</TabsTrigger>
              </TabsList>
              
              <TabsContent value="equity" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Equity Research</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our equity research provides in-depth analysis of listed companies across African markets, with a focus on companies listed on the Ghana Stock Exchange.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Company Initiation Reports</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Quarterly Earnings Analysis</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Valuation Updates</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Corporate Action Analysis</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Our Methodology</h4>
                    <p className="mb-6 dark:text-gray-300">
                      Our equity research approach combines fundamental analysis with local market intelligence:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">Fundamental Analysis</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive financial statement analysis and valuation models</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">Management Engagement</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Regular meetings with company executives to understand strategy</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">Local Context Integration</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Analysis that accounts for local market dynamics and regulatory environment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="macro" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Macroeconomic Analysis</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our macroeconomic research provides insights into economic trends, policy developments, and their implications for financial markets across Ghana and Africa.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Economic Outlook Reports</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Policy Analysis</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Inflation & Interest Rate Forecasts</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Currency Analysis</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Featured Reports</h4>
                    <div className="space-y-4">
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">Ghana Economic Outlook 2025</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive analysis of Ghana's economic trajectory</p>
                          <Link to="/research" className="text-cc-navy text-sm flex items-center mt-2 dark:text-cc-gold">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">West African Currency Analysis</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Foreign exchange trends and projections</p>
                          <Link to="/research" className="text-cc-navy text-sm flex items-center mt-2 dark:text-cc-gold">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">Central Bank Policy Review</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Analysis of monetary policy decisions and implications</p>
                          <Link to="/research" className="text-cc-navy text-sm flex items-center mt-2 dark:text-cc-gold">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sector" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <FileText className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Sector Reports</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our sector reports provide deep dives into key industries across Ghana and Africa, examining competitive dynamics, regulatory environments, and growth opportunities.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Banking & Financial Services</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Energy & Utilities</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Consumer & Retail</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Telecommunications</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Agriculture & Food Processing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Sector Coverage</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Banking Sector</h5>
                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                          <li>• Quarterly Banking Analysis</li>
                          <li>• NPL Trends</li>
                          <li>• Digital Banking</li>
                          <li>• Regulatory Impact</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Energy Sector</h5>
                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                          <li>• Oil & Gas Trends</li>
                          <li>• Renewable Energy</li>
                          <li>• Power Generation</li>
                          <li>• Energy Policy</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Consumer Sector</h5>
                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                          <li>• Retail Analytics</li>
                          <li>• FMCG Market</li>
                          <li>• Consumer Behavior</li>
                          <li>• E-commerce Growth</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-cc-navy mb-2 dark:text-white">Telecom Sector</h5>
                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                          <li>• Mobile Money Growth</li>
                          <li>• Data Services</li>
                          <li>• Telecom Infrastructure</li>
                          <li>• Digital Inclusion</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="thematic" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <LineChart className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Thematic Research</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our thematic research explores emerging trends and developments that create investment opportunities or risks across markets and industries.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Digital Transformation in Africa</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">ESG Investment Trends</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">African Continental Free Trade Area (AfCFTA)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Financial Inclusion & Innovation</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="border-cc-navy text-cc-navy hover:bg-cc-navy hover:text-white dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold dark:hover:text-cc-navy">
                      <Link to="/research" className="flex items-center">
                        Explore Thematic Insights <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Featured Thematic Reports</h4>
                    <div className="space-y-4">
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">Digital Transformation in Africa</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">The evolution of digital technologies and their impact on African economies</p>
                          <Link to="/research" className="text-cc-navy text-sm flex items-center mt-2 dark:text-cc-gold">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">ESG Investing in Frontier Markets</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">How ESG considerations are shaping investment in African markets</p>
                          <Link to="/research" className="text-cc-navy text-sm flex items-center mt-2 dark:text-cc-gold">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">AfCFTA: Investment Implications</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">How the Continental Free Trade Area will reshape investment opportunities</p>
                          <Link to="/research" className="text-cc-navy text-sm flex items-center mt-2 dark:text-cc-gold">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Research Process */}
          <div className="my-16 bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Our Research Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold dark:bg-cc-gold dark:text-cc-navy">1</div>
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Data Collection</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive gathering of financial data, market information, and industry intelligence.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold dark:bg-cc-gold dark:text-cc-navy">2</div>
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Rigorous Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  In-depth examination using proprietary models and methodologies by sector specialists.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold dark:bg-cc-gold dark:text-cc-navy">3</div>
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Peer Review</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Collaborative evaluation process ensuring accuracy and quality of insights and recommendations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold dark:bg-cc-gold dark:text-cc-navy">4</div>
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Actionable Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Clear, concise reporting with practical investment implications and recommendations.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Access Our Research Insights</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Stay informed with our latest market analysis, company reports, and investment recommendations.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold text-lg px-8 py-6">
                <Link to="/research" className="flex items-center">
                  View Research Reports <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-cc-navy font-bold text-lg px-8 py-6">
                <Link to="/contact" className="flex items-center">
                  Request Custom Research <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearchServices;
