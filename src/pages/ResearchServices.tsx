
import React from 'react';
import PageHero from '@/components/layout/PageHero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, BarChart3, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResearchServices = () => {
  useAnalytics();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <PageHero
          eyebrow="Market Intelligence"
          title={<>Investment <span className="text-accent">Research</span></>}
          description="In-depth analysis of market trends, equity performance and economic developments across Ghana and Africa."
          primaryCta={{ label: 'Schedule a Consultation', to: '/contact' }}
          secondaryCta={{ label: 'Explore Research', to: '/research' }}
          icon={LineChart}
          highlights={['Equity and fixed income coverage', 'Daily and weekly market reports', 'Macroeconomic outlooks', 'Sector deep dives']}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading text-foreground">Research Excellence</h2>
              <p className="mb-6 text-muted-foreground">
                Our Investment Research team delivers comprehensive market intelligence and analysis to help clients navigate complex financial markets. With a focus on Ghana and broader African markets, our research combines macroeconomic insights with detailed company analysis to identify investment opportunities and risks.
              </p>
              <p className="mb-8 text-muted-foreground">
                Led by experienced analysts with deep sector expertise, our research covers equities, fixed income, commodities, and currencies, providing you with the information needed to make informed investment decisions in rapidly evolving markets.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/research" className="flex items-center">
                  View Our Research <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <img 
                src="/lovable-uploads/749a8bb6-9f9d-4731-8233-2a3459f75e84.png" 
                alt="Investment Research" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Research Categories */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground font-heading">Our Research Coverage</h2>
            
            <Tabs defaultValue="equity" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="equity" className="text-lg py-3">Equity Research</TabsTrigger>
                <TabsTrigger value="macro" className="text-lg py-3">Macroeconomic Analysis</TabsTrigger>
                <TabsTrigger value="sector" className="text-lg py-3">Sector Reports</TabsTrigger>
                <TabsTrigger value="thematic" className="text-lg py-3">Thematic Research</TabsTrigger>
              </TabsList>
              
              <TabsContent value="equity" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Equity Research</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our equity research provides in-depth analysis of listed companies across African markets, with a focus on companies listed on the Ghana Stock Exchange.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Company Initiation Reports</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Quarterly Earnings Analysis</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Valuation Updates</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Corporate Action Analysis</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Our Methodology</h4>
                    <p className="mb-6 text-muted-foreground">
                      Our equity research approach combines fundamental analysis with local market intelligence:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">Fundamental Analysis</h5>
                          <p className="text-sm text-muted-foreground">Comprehensive financial statement analysis and valuation models</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">Management Engagement</h5>
                          <p className="text-sm text-muted-foreground">Regular meetings with company executives to understand strategy</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">Local Context Integration</h5>
                          <p className="text-sm text-muted-foreground">Analysis that accounts for local market dynamics and regulatory environment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="macro" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Macroeconomic Analysis</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our macroeconomic research provides insights into economic trends, policy developments, and their implications for financial markets across Ghana and Africa.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Economic Outlook Reports</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Policy Analysis</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Inflation & Interest Rate Forecasts</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Currency Analysis</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Featured Reports</h4>
                    <div className="space-y-4">
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">Ghana Economic Outlook 2025</CardTitle>
                          <p className="text-sm text-muted-foreground">Comprehensive analysis of Ghana's economic trajectory</p>
                          <Link to="/research" className="text-accent text-sm flex items-center mt-2">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">West African Currency Analysis</CardTitle>
                          <p className="text-sm text-muted-foreground">Foreign exchange trends and projections</p>
                          <Link to="/research" className="text-accent text-sm flex items-center mt-2">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">Central Bank Policy Review</CardTitle>
                          <p className="text-sm text-muted-foreground">Analysis of monetary policy decisions and implications</p>
                          <Link to="/research" className="text-accent text-sm flex items-center mt-2">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sector" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <FileText className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Sector Reports</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our sector reports provide deep dives into key industries across Ghana and Africa, examining competitive dynamics, regulatory environments, and growth opportunities.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Banking & Financial Services</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Energy & Utilities</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Consumer & Retail</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Telecommunications</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Agriculture & Food Processing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Sector Coverage</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-foreground mb-2 ">Banking Sector</h5>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>• Quarterly Banking Analysis</li>
                          <li>• NPL Trends</li>
                          <li>• Digital Banking</li>
                          <li>• Regulatory Impact</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-foreground mb-2 ">Energy Sector</h5>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>• Oil & Gas Trends</li>
                          <li>• Renewable Energy</li>
                          <li>• Power Generation</li>
                          <li>• Energy Policy</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-foreground mb-2 ">Consumer Sector</h5>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>• Retail Analytics</li>
                          <li>• FMCG Market</li>
                          <li>• Consumer Behavior</li>
                          <li>• E-commerce Growth</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-600">
                        <h5 className="font-medium text-foreground mb-2 ">Telecom Sector</h5>
                        <ul className="text-sm space-y-2 text-muted-foreground">
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
              
              <TabsContent value="thematic" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <LineChart className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Thematic Research</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our thematic research explores emerging trends and developments that create investment opportunities or risks across markets and industries.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Digital Transformation in Africa</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">ESG Investment Trends</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">African Continental Free Trade Area (AfCFTA)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Financial Inclusion & Innovation</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="border-border text-foreground hover:bg-accent/10 hover:text-accent">
                      <Link to="/research" className="flex items-center">
                        Explore Thematic Insights <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Featured Thematic Reports</h4>
                    <div className="space-y-4">
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">Digital Transformation in Africa</CardTitle>
                          <p className="text-sm text-muted-foreground">The evolution of digital technologies and their impact on African economies</p>
                          <Link to="/research" className="text-accent text-sm flex items-center mt-2">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">ESG Investing in Frontier Markets</CardTitle>
                          <p className="text-sm text-muted-foreground">How ESG considerations are shaping investment in African markets</p>
                          <Link to="/research" className="text-accent text-sm flex items-center mt-2">
                            Read Report <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">AfCFTA: Investment Implications</CardTitle>
                          <p className="text-sm text-muted-foreground">How the Continental Free Trade Area will reshape investment opportunities</p>
                          <Link to="/research" className="text-accent text-sm flex items-center mt-2">
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
          <div className="my-16 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-3xl font-bold mb-8 text-foreground font-heading">Our Research Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 ">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <div className="bg-accent mx-auto h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold">1</div>
                </div>
                <h3 className="text-lg font-bold mb-2 ">Data Collection</h3>
                <p className="text-muted-foreground">
                  Comprehensive gathering of financial data, market information, and industry intelligence.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 ">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <div className="bg-accent mx-auto h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold">2</div>
                </div>
                <h3 className="text-lg font-bold mb-2 ">Rigorous Analysis</h3>
                <p className="text-muted-foreground">
                  In-depth examination using proprietary models and methodologies by sector specialists.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 ">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <div className="bg-accent mx-auto h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold">3</div>
                </div>
                <h3 className="text-lg font-bold mb-2 ">Peer Review</h3>
                <p className="text-muted-foreground">
                  Collaborative evaluation process ensuring accuracy and quality of insights and recommendations.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 ">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <div className="bg-accent mx-auto h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold">4</div>
                </div>
                <h3 className="text-lg font-bold mb-2 ">Actionable Insights</h3>
                <p className="text-muted-foreground">
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
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6">
                <Link to="/research" className="flex items-center">
                  View Research Reports <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
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
