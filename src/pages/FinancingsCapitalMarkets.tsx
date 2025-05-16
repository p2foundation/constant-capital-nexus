
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, Banknote, LineChart, Building, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const FinancingsCapitalMarkets = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-cc-navy text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Financings & Capital Markets</h1>
              <p className="text-lg md:text-xl mb-8">
                Providing capital raising solutions through debt and equity offerings, with specialized expertise in African capital markets.
              </p>
              <div className="flex items-center">
                <Banknote className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Expert solutions for businesses across Ghana and Africa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Capital Markets Excellence</h2>
              <p className="mb-6 dark:text-gray-300">
                Our Financings & Capital Markets practice offers comprehensive solutions for businesses seeking to raise capital through public or private markets. We leverage our deep understanding of Ghana's financial ecosystem and broader African markets to provide tailored financing strategies that meet your specific needs.
              </p>
              <p className="mb-8 dark:text-gray-300">
                With decades of collective experience, our team delivers exceptional guidance through complex capital raising processes, ensuring optimal outcomes for our clients. Whether you're considering an IPO, debt issuance, private placement, or restructuring, we provide end-to-end support through every stage of the transaction.
              </p>
              <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
                <Link to="/contact" className="flex items-center">
                  Discuss Your Capital Needs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
              <img 
                src="/lovable-uploads/5d82ecc8-34e0-4284-9c90-434650eaf740.png" 
                alt="Capital Markets" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Services Tabs */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Our Financing Solutions</h2>
            
            <Tabs defaultValue="equity" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="equity" className="text-lg py-3">Equity Capital</TabsTrigger>
                <TabsTrigger value="debt" className="text-lg py-3">Debt Capital</TabsTrigger>
                <TabsTrigger value="restructuring" className="text-lg py-3">Restructuring</TabsTrigger>
                <TabsTrigger value="advisory" className="text-lg py-3">Market Advisory</TabsTrigger>
              </TabsList>
              
              <TabsContent value="equity" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Equity Capital Markets</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our equity capital markets team provides comprehensive assistance for companies looking to raise capital through equity offerings, whether through public markets or private placements.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Initial Public Offerings (IPOs)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Follow-on Offerings</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Private Placements</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Rights Issues</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Recent Transaction Highlights</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">GHS 250M IPO</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Led the successful listing of a leading financial institution on the Ghana Stock Exchange</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">GHS 150M Rights Issue</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Structured and executed a rights issue for a major manufacturing company</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">USD 75M Private Placement</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Facilitated equity investment for an expanding energy company</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="debt" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Banknote className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Debt Capital Markets</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      Our debt capital markets team helps clients access funding through various debt instruments, providing guidance on structure, pricing, and market placement.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Corporate Bonds</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Eurobonds</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Medium-Term Notes</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Structured Finance Solutions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Recent Debt Transactions</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">GHS 500M Corporate Bond</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Arranged multi-tranche bond issuance for infrastructure financing</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">USD 100M Eurobond</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Co-managed international bond offering for a financial institution</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cc-navy p-2 rounded-full mr-3 shrink-0 dark:bg-cc-gold">
                          <ArrowRight className="h-4 w-4 text-white dark:text-cc-navy" />
                        </div>
                        <div>
                          <h5 className="font-medium dark:text-white">GHS 200M Medium-Term Note Program</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Established flexible debt program for a major retail company</p>
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
                      <Building className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Restructuring & Recapitalization</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      We provide expert guidance through complex financial restructurings, helping businesses optimize their capital structure and navigate challenging financial situations.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Debt Restructuring</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Balance Sheet Optimization</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Distressed Financing</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Turnaround Advisory</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Our Approach</h4>
                    <p className="mb-4 dark:text-gray-300">
                      Our restructuring approach combines financial expertise with practical business knowledge:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">1</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Comprehensive Analysis</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Deep dive into financial position and options</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">2</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Strategic Planning</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Developing tailored solutions aligned with business goals</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200 dark:border-gray-600 pb-4">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">3</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Stakeholder Negotiation</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Expert management of creditor and investor discussions</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-cc-navy h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 dark:bg-cc-gold dark:text-cc-navy">4</div>
                        <div>
                          <h5 className="font-medium dark:text-white">Implementation & Monitoring</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Execution support and ongoing guidance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advisory" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <LineChart className="h-6 w-6 text-cc-gold mr-2" />
                      <h3 className="text-2xl font-bold text-cc-navy dark:text-white">Capital Markets Advisory</h3>
                    </div>
                    <p className="mb-4 dark:text-gray-300">
                      We provide strategic advice on capital markets positioning, investor relations, and market timing to help clients optimize their approach to raising capital.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Market Intelligence & Timing</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Investor Relations Strategy</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Pre-IPO Advisory</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-cc-gold mr-2 shrink-0 mt-0.5" />
                        <span className="dark:text-gray-300">Regulatory Navigation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                    <h4 className="text-lg font-semibold mb-4 dark:text-white">Advisory Services</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-cc-navy dark:text-white">Market Positioning</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 dark:text-gray-300">Strategic guidance on positioning your offering for market success</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-cc-navy dark:text-white">Investor Relations</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 dark:text-gray-300">Building and maintaining relationships with institutional investors</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-cc-navy dark:text-white">Pre-Transaction Readiness</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive preparation for capital markets transactions</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-gray-200 dark:border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-cc-navy dark:text-white">Regulatory Advisory</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 dark:text-gray-300">Guidance on compliance with securities regulations</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Why Choose Us */}
          <div className="my-16 bg-gray-50 p-8 rounded-lg dark:bg-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Why Choose Our Capital Markets Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <TrendingUp className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Market Leadership</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Recognized leadership in Ghana's capital markets with a strong track record of successful transactions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <Banknote className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Innovative Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Creative approaches to capital raising that address unique market challenges and opportunities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <Building className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Industry Expertise</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deep knowledge of key sectors including financial services, energy, infrastructure, and consumer goods.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center dark:bg-gray-700">
                <div className="bg-cc-navy/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-cc-gold/20">
                  <LineChart className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Results-Driven</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Focused on achieving optimal outcomes for clients through strategic execution and market intelligence.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Capital Raising Options?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our team of capital markets experts is ready to help you navigate financing options and execute successful transactions.
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

export default FinancingsCapitalMarkets;
