
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, TrendingUp, BarChart3, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivateEquity = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-cc-navy text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Private Equity</h1>
              <p className="text-lg md:text-xl mb-8">
                Alternative investment solutions focusing on growth capital for promising businesses across key sectors in Ghana and Africa.
              </p>
              <div className="flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Unlocking value through strategic investments and partnerships</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Capital & Expertise</h2>
              <p className="mb-6 dark:text-gray-300">
                Our Private Equity practice provides growth capital and strategic guidance to promising businesses across Ghana and broader African markets. We partner with management teams to accelerate growth, improve operational efficiency, and create sustainable value.
              </p>
              <p className="mb-8 dark:text-gray-300">
                With deep sector expertise and a hands-on approach, we help portfolio companies navigate challenges, capitalize on opportunities, and achieve their full potential. Our investment strategy focuses on high-potential businesses in sectors poised for growth, where our capital and expertise can drive meaningful transformation.
              </p>
              <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
                <Link to="/contact" className="flex items-center">
                  Discuss Investment Opportunities <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
              <img 
                src="/lovable-uploads/1f153fc7-d536-4eab-8f5c-6527267e1769.png" 
                alt="Private Equity" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Investment Approach */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Our Investment Approach</h2>
            
            <Tabs defaultValue="strategy" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="strategy" className="text-lg py-3">Investment Strategy</TabsTrigger>
                <TabsTrigger value="sectors" className="text-lg py-3">Target Sectors</TabsTrigger>
                <TabsTrigger value="process" className="text-lg py-3">Investment Process</TabsTrigger>
                <TabsTrigger value="value" className="text-lg py-3">Value Creation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="strategy" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Investment Strategy</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our investment strategy is centered on providing growth capital to established businesses with strong fundamentals and significant potential for expansion.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Minority and majority investments</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Established businesses with proven business models</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Focus on Ghana and select African markets</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Partnership approach with management teams</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Typical investment period of 4-7 years</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Investment Criteria</h4>
                    <div className="space-y-4">
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base dark:text-white">Company Size</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Businesses with annual revenues between $5 million and $50 million
                          </p>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base dark:text-white">Investment Size</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Typical equity investments ranging from $2 million to $15 million
                          </p>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base dark:text-white">Growth Potential</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Companies with significant expansion opportunities and scalable business models
                          </p>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base dark:text-white">Management</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Strong management teams with proven track records and aligned interests
                          </p>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sectors" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Building className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Target Sectors</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      We focus our investments on sectors with strong growth fundamentals driven by favorable demographic trends, increasing consumer spending, and structural economic shifts across Africa.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Financial Services</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Consumer & Retail</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Healthcare</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Education</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Technology & Digital Services</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Agribusiness & Food Processing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Sector Investment Theses</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">Financial Services</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Investing in financial inclusion, digital banking, and innovative financial solutions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">Healthcare</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Supporting the expansion of quality healthcare services, pharmaceutical distribution, and health technology</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">Consumer & Retail</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Capitalizing on the growing middle class and increasing consumer spending power</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">Technology</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Investing in digital transformation, fintech, and technology enablement across sectors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="process" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Investment Process</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our disciplined investment process ensures thorough evaluation of opportunities and effective post-investment management to drive value creation.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Deal Sourcing & Screening</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Initial Due Diligence</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Detailed Due Diligence</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Investment Committee Approval</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Transaction Execution</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Portfolio Management</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Exit Planning & Execution</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Our Investment Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">1</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Initial Screening & Engagement</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">1-2 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">2</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Preliminary Due Diligence</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">2-4 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">3</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Comprehensive Due Diligence</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">4-8 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">4</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Final Negotiation & Closing</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">2-4 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">5</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Active Portfolio Management</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">4-7 years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="value" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Users className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Value Creation</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      We take an active approach to value creation, working closely with portfolio companies to implement strategic initiatives that drive sustainable growth and operational excellence.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Strategic Guidance & Direction</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Operational Improvement</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Financial Management & Optimization</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Access to Networks & Partnerships</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Talent Acquisition & Development</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">M&A and Geographic Expansion</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Value Creation Framework</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">Strategic Growth</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Market expansion, new product development, and strategic acquisitions</p>
                          </CardContent>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">Operational Excellence</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Process optimization, cost efficiency, and quality improvement</p>
                          </CardContent>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">Financial Structure</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Capital structure optimization and financial performance management</p>
                          </CardContent>
                        </CardHeader>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium dark:text-white">Governance & People</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Strengthening management teams and governance frameworks</p>
                          </CardContent>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Portfolio Highlights */}
          <div className="my-16 bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Portfolio Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden dark:bg-gray-600">
                  <img src="/placeholder.svg" alt="Company A" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-cc-navy mb-2 dark:text-white">FinTech Solutions Inc.</h3>
                <p className="text-sm text-gray-700 mb-2 dark:text-gray-300">Financial Services | Ghana</p>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Leading provider of digital payment solutions for businesses across West Africa.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Investment Date:</span>
                    <span>2023</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Status:</span>
                    <span>Active Portfolio Company</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden dark:bg-gray-600">
                  <img src="/placeholder.svg" alt="Company B" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-cc-navy mb-2 dark:text-white">MediCare Group</h3>
                <p className="text-sm text-gray-700 mb-2 dark:text-gray-300">Healthcare | Nigeria</p>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Network of outpatient clinics providing affordable healthcare services in urban areas.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Investment Date:</span>
                    <span>2022</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Status:</span>
                    <span>Active Portfolio Company</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden dark:bg-gray-600">
                  <img src="/placeholder.svg" alt="Company C" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-cc-navy mb-2 dark:text-white">AgriTech Ventures</h3>
                <p className="text-sm text-gray-700 mb-2 dark:text-gray-300">Agribusiness | Ghana</p>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Technology-enabled agricultural company improving farmer productivity and market access.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Investment Date:</span>
                    <span>2021</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Status:</span>
                    <span>Active Portfolio Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Investment Team</h2>
            <p className="text-center max-w-3xl mx-auto mb-12 dark:text-gray-300">
              Our private equity team combines deep financial expertise with local market knowledge and operational experience to support portfolio companies through their growth journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden dark:bg-gray-600">
                  <img src="/placeholder.svg" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-cc-navy mb-1 dark:text-white">John Addo</h3>
                <p className="text-sm text-cc-gold mb-3">Partner & Head of Private Equity</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  15+ years of private equity and investment banking experience across African markets.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden dark:bg-gray-600">
                  <img src="/placeholder.svg" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-cc-navy mb-1 dark:text-white">Sarah Mensah</h3>
                <p className="text-sm text-cc-gold mb-3">Investment Director</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Expertise in financial services and consumer sectors with focus on operational improvements.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden dark:bg-gray-600">
                  <img src="/placeholder.svg" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-cc-navy mb-1 dark:text-white">Michael Osei</h3>
                <p className="text-sm text-cc-gold mb-3">Investment Manager</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Specialized in healthcare investments and digital transformation strategies.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Partner with Constant Capital</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Whether you're seeking growth capital for your business or looking to invest alongside us, our team is ready to explore opportunities for collaboration.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold text-lg px-8 py-6">
                <Link to="/contact" className="flex items-center">
                  Discuss Investment Opportunities <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-cc-navy hover:bg-white hover:text-cc-navy font-bold text-lg px-8 py-6">
                <Link to="/contact" className="flex items-center">
                  Submit Investment Proposal <ArrowRight className="ml-2 h-5 w-5" />
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

export default PrivateEquity;
