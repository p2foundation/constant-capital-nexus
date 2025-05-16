
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, PieChart, BarChart3, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestmentAdvisory = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-cc-navy text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Advisory</h1>
              <p className="text-lg md:text-xl mb-8">
                Tailored investment strategies to help you achieve your financial goals with confidence and clarity.
              </p>
              <div className="flex items-center">
                <LineChart className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Expert guidance for institutional and individual investors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy">Strategic Investment Solutions</h2>
              <p className="mb-6">
                Our Investment Advisory practice offers comprehensive, personalized strategies designed to meet your specific financial objectives. Whether you're an institutional client or a high-net-worth individual, our team of experienced advisors combines deep market knowledge with sophisticated analytics to develop solutions tailored to your unique needs.
              </p>
              <p className="mb-8">
                We take a holistic approach to wealth management, considering your complete financial picture including growth targets, risk tolerance, time horizon, and liquidity requirements. Our advisors maintain close relationships with clients, providing ongoing support and adjusting strategies as market conditions and personal circumstances evolve.
              </p>
              <Button className="bg-cc-navy hover:bg-blue-900">
                <Link to="/contact" className="flex items-center">
                  Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <img 
                src="/lovable-uploads/d6c6d4c9-dd0e-488b-a267-64e2fe8ca8a6.png" 
                alt="Investment Advisory Meeting" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Services Tabs */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center">Our Advisory Services</h2>
            
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full mb-8">
                <TabsTrigger value="portfolio" className="text-lg py-3">Portfolio Management</TabsTrigger>
                <TabsTrigger value="planning" className="text-lg py-3">Financial Planning</TabsTrigger>
                <TabsTrigger value="research" className="text-lg py-3">Investment Research</TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio" className="p-6 bg-gray-50 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <PieChart className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy">Portfolio Management</h3>
                    </div>
                    <p className="mb-4">
                      Our portfolio management service offers active management of your investment assets based on your specific goals and risk tolerance. We construct diversified portfolios across asset classes, geographies, and sectors to optimize returns while managing risk.
                    </p>
                    <ul className="space-y-2 mb-6">
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
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-4">Our Approach</h4>
                    <p className="mb-6">
                      We utilize a disciplined investment process that combines fundamental research with quantitative analysis to identify opportunities across global markets, focusing on:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium">Long-term Perspective</h5>
                          <p className="text-sm text-gray-600">Strategic allocations based on long-term economic and market forecasts</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium">Tactical Flexibility</h5>
                          <p className="text-sm text-gray-600">Adjusting positions to capitalize on short-term market inefficiencies</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium">Risk Management</h5>
                          <p className="text-sm text-gray-600">Sophisticated risk controls to protect capital in various market environments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="planning" className="p-6 bg-gray-50 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Briefcase className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy">Financial Planning</h3>
                    </div>
                    <p className="mb-4">
                      Our comprehensive financial planning service helps you create a roadmap to achieve your short and long-term financial goals. We analyze your current financial situation and develop strategies tailored to your specific needs.
                    </p>
                    <ul className="space-y-2 mb-6">
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
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-4">Planning Process</h4>
                    <p className="mb-6">
                      Our financial planning process is designed to be comprehensive, collaborative, and adaptive to changing circumstances:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center border-b border-gray-200 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                        <div>
                          <h5 className="font-medium">Discovery & Goal Setting</h5>
                          <p className="text-sm text-gray-600">Understanding your financial situation, objectives, and priorities</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                        <div>
                          <h5 className="font-medium">Strategy Development</h5>
                          <p className="text-sm text-gray-600">Creating tailored strategies aligned with your goals</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                        <div>
                          <h5 className="font-medium">Implementation</h5>
                          <p className="text-sm text-gray-600">Executing recommendations across various financial aspects</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3">4</div>
                        <div>
                          <h5 className="font-medium">Monitoring & Review</h5>
                          <p className="text-sm text-gray-600">Regular reviews and adjustments as circumstances change</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="research" className="p-6 bg-gray-50 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy">Investment Research</h3>
                    </div>
                    <p className="mb-4">
                      Our investment research provides in-depth analysis and insights to inform your investment decisions. Our team of analysts monitors global markets, economic trends, and individual securities to identify opportunities and risks.
                    </p>
                    <ul className="space-y-2 mb-6">
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
                    <Button variant="outline" className="border-cc-navy text-cc-navy hover:bg-cc-navy hover:text-white">
                      <Link to="/research" className="flex items-center">
                        View Research Reports <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-4">Research Coverage</h4>
                    <p className="mb-6">
                      Our research team provides comprehensive coverage across markets and asset classes:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h5 className="font-medium text-cc-navy mb-2">Equities</h5>
                        <ul className="text-sm space-y-2">
                          <li>• Ghana Stock Exchange</li>
                          <li>• Nigeria Stock Exchange</li>
                          <li>• Kenya Stock Exchange</li>
                          <li>• South Africa JSE</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h5 className="font-medium text-cc-navy mb-2">Fixed Income</h5>
                        <ul className="text-sm space-y-2">
                          <li>• Government Securities</li>
                          <li>• Corporate Bonds</li>
                          <li>• Eurobonds</li>
                          <li>• Money Market</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h5 className="font-medium text-cc-navy mb-2">Alternative Investments</h5>
                        <ul className="text-sm space-y-2">
                          <li>• Real Estate</li>
                          <li>• Private Equity</li>
                          <li>• Infrastructure</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h5 className="font-medium text-cc-navy mb-2">Macro Analysis</h5>
                        <ul className="text-sm space-y-2">
                          <li>• Economic Indicators</li>
                          <li>• Policy Analysis</li>
                          <li>• Currency Forecasts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Why Choose Us */}
          <div className="my-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center">Why Choose Our Advisory Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <PieChart className="h-8 w-8 text-cc-navy" />
                </div>
                <h3 className="text-lg font-bold mb-2">Expertise & Experience</h3>
                <p className="text-gray-600">
                  Our advisors average 15+ years of investment experience across multiple market cycles.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <LineChart className="h-8 w-8 text-cc-navy" />
                </div>
                <h3 className="text-lg font-bold mb-2">Tailored Solutions</h3>
                <p className="text-gray-600">
                  Customized strategies designed for your unique financial goals and circumstances.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-cc-navy" />
                </div>
                <h3 className="text-lg font-bold mb-2">Research-Driven</h3>
                <p className="text-gray-600">
                  Investment decisions backed by rigorous analysis and proprietary research.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-cc-navy" />
                </div>
                <h3 className="text-lg font-bold mb-2">Client Focus</h3>
                <p className="text-gray-600">
                  Dedicated advisors providing personalized attention and responsive service.
                </p>
              </div>
            </div>
          </div>
          
          {/* Client Testimonial */}
          <div className="my-16">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-cc-gold">
              <div className="flex flex-col items-center text-center">
                <blockquote className="italic text-lg mb-6">
                  "The investment advisory team at Constant Capital has been instrumental in helping us navigate complex markets. Their strategic guidance and personalized approach have consistently delivered results that exceed our expectations."
                </blockquote>
                <div className="font-medium text-cc-navy">
                  — Chief Investment Officer, Leading Pension Fund
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Investment Strategy?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our team of expert advisors is ready to help you achieve your financial goals with tailored investment solutions.
            </p>
            <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold text-lg px-8 py-6">
              <Link to="/contact" className="flex items-center">
                Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvestmentAdvisory;
