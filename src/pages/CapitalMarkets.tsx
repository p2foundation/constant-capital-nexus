
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, BarChart3, Building, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CapitalMarkets = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-cc-navy text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Financings & Capital Markets</h1>
              <p className="text-lg md:text-xl mb-8">
                Strategic capital raising solutions through debt and equity offerings across African capital markets.
              </p>
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Empowering businesses with tailored financing solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Overview Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy">Capital Raising Solutions</h2>
              <p className="mb-6">
                Our Capital Markets team specializes in structuring and executing debt and equity transactions to help companies achieve their strategic and financial objectives. We leverage our deep market knowledge, extensive investor relationships, and transaction expertise to deliver optimal outcomes for our clients.
              </p>
              <p className="mb-6">
                Whether you're seeking growth capital, refinancing existing debt, or pursuing strategic acquisitions, our experienced team will guide you through the entire process, from initial strategy development to successful transaction execution.
              </p>
              <Button className="bg-cc-navy hover:bg-blue-900">
                <Link to="/contact" className="flex items-center">
                  Discuss Your Financing Needs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <img 
                src="/lovable-uploads/d6c6d4c9-dd0e-488b-a267-64e2fe8ca8a6.png" 
                alt="Capital Markets Meeting" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Services Section */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-10 text-cc-navy text-center">Our Capital Markets Services</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Equity Capital Markets */}
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-cc-gold">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-cc-navy mr-3" />
                  <h3 className="text-2xl font-bold text-cc-navy">Equity Capital Markets</h3>
                </div>
                <p className="mb-6">
                  We help companies raise equity capital through a variety of structures and approaches tailored to their specific needs and market conditions.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Initial Public Offerings (IPOs)</span>
                      <span className="text-gray-600">Guidance through the entire IPO process, from preparation to listing.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Follow-on Offerings</span>
                      <span className="text-gray-600">Secondary offerings to raise additional capital for listed companies.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Private Placements</span>
                      <span className="text-gray-600">Targeted equity offerings to qualified institutional and individual investors.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Rights Issues</span>
                      <span className="text-gray-600">Structuring and executing rights offerings for existing shareholders.</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Debt Capital Markets */}
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-cc-gold">
                <div className="flex items-center mb-4">
                  <FilePlus className="h-8 w-8 text-cc-navy mr-3" />
                  <h3 className="text-2xl font-bold text-cc-navy">Debt Capital Markets</h3>
                </div>
                <p className="mb-6">
                  We structure and arrange debt solutions across the capital structure, helping clients optimize their financing mix and manage liabilities effectively.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Corporate Bonds</span>
                      <span className="text-gray-600">Issuance of medium to long-term debt securities in local and international markets.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Commercial Paper</span>
                      <span className="text-gray-600">Short-term debt instruments for working capital and liquidity management.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Structured Notes</span>
                      <span className="text-gray-600">Customized debt instruments with specific risk-return profiles.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Project Finance</span>
                      <span className="text-gray-600">Long-term financing for infrastructure and development projects.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Advisory Services */}
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-cc-gold">
                <div className="flex items-center mb-4">
                  <Building className="h-8 w-8 text-cc-navy mr-3" />
                  <h3 className="text-2xl font-bold text-cc-navy">Corporate Advisory</h3>
                </div>
                <p className="mb-6">
                  We provide strategic advice on capital structure, financial policy, and transaction structuring to optimize your company's financial position.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Capital Structure Optimization</span>
                      <span className="text-gray-600">Strategic advice on the optimal mix of debt and equity.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Ratings Advisory</span>
                      <span className="text-gray-600">Guidance on credit rating strategies and engagement with rating agencies.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Liability Management</span>
                      <span className="text-gray-600">Strategies for refinancing, repurchasing, or restructuring existing debt.</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Market Access */}
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-cc-gold">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-8 w-8 text-cc-navy mr-3" />
                  <h3 className="text-2xl font-bold text-cc-navy">Market Access</h3>
                </div>
                <p className="mb-6">
                  We connect issuers with diverse pools of capital through our extensive network of institutional investors, high-net-worth individuals, and financial institutions.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Investor Relations</span>
                      <span className="text-gray-600">Strategic engagement with investors to build relationships and support.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Market Intelligence</span>
                      <span className="text-gray-600">Insights on market sentiment, pricing, and timing for optimal execution.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-cc-gold mr-3 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium block">Distribution Capabilities</span>
                      <span className="text-gray-600">Access to diverse investor bases across Africa and beyond.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Transaction Process */}
          <div className="my-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center">Our Transaction Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Process Step Line */}
                <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1 bg-cc-navy/20 transform -translate-x-1/2"></div>
                
                {/* Process Steps */}
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="flex md:justify-end md:w-1/2 md:pr-8">
                      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cc-gold max-w-sm">
                        <h3 className="text-xl font-bold mb-3 text-cc-navy">Initial Consultation</h3>
                        <p className="text-gray-600">
                          We begin by understanding your capital needs, objectives, and timeframes, and provide initial guidance on potential financing options.
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 md:left-1/2 w-8 h-8 bg-cc-navy rounded-full border-4 border-white transform -translate-x-1/2 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="hidden md:block md:w-1/2"></div>
                    <div className="absolute top-0 left-0 md:left-1/2 w-8 h-8 bg-cc-navy rounded-full border-4 border-white transform -translate-x-1/2 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cc-gold max-w-sm">
                        <h3 className="text-xl font-bold mb-3 text-cc-navy">Strategic Planning</h3>
                        <p className="text-gray-600">
                          We develop a detailed financing plan, including optimal structure, size, timing, and target investor base for your transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="flex md:justify-end md:w-1/2 md:pr-8">
                      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cc-gold max-w-sm">
                        <h3 className="text-xl font-bold mb-3 text-cc-navy">Documentation & Preparation</h3>
                        <p className="text-gray-600">
                          We coordinate the preparation of transaction documentation, regulatory filings, and marketing materials to support your offering.
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 md:left-1/2 w-8 h-8 bg-cc-navy rounded-full border-4 border-white transform -translate-x-1/2 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="hidden md:block md:w-1/2"></div>
                    <div className="absolute top-0 left-0 md:left-1/2 w-8 h-8 bg-cc-navy rounded-full border-4 border-white transform -translate-x-1/2 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cc-gold max-w-sm">
                        <h3 className="text-xl font-bold mb-3 text-cc-navy">Marketing & Execution</h3>
                        <p className="text-gray-600">
                          We engage with investors, manage the book-building process, and optimize pricing to achieve the best outcome for your transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    <div className="flex md:justify-end md:w-1/2 md:pr-8">
                      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cc-gold max-w-sm">
                        <h3 className="text-xl font-bold mb-3 text-cc-navy">Completion & Follow-up</h3>
                        <p className="text-gray-600">
                          We ensure a smooth closing process and provide ongoing support for investor relations and future financing needs.
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 md:left-1/2 w-8 h-8 bg-cc-navy rounded-full border-4 border-white transform -translate-x-1/2 flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Track Record */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center">Our Track Record</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-cc-gold"></div>
                <div className="p-6">
                  <p className="text-sm text-cc-gold font-medium mb-2">Corporate Bond</p>
                  <h3 className="text-xl font-bold mb-2">GHS 150 Million</h3>
                  <p className="text-gray-600 mb-4">7-year senior secured notes for a leading telecommunications company</p>
                  <p className="text-gray-500 text-sm">Lead Arranger & Bookrunner</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-cc-gold"></div>
                <div className="p-6">
                  <p className="text-sm text-cc-gold font-medium mb-2">Initial Public Offering</p>
                  <h3 className="text-xl font-bold mb-2">GHS 80 Million</h3>
                  <p className="text-gray-600 mb-4">Listing on the Ghana Stock Exchange for a financial services company</p>
                  <p className="text-gray-500 text-sm">Lead Underwriter</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-cc-gold"></div>
                <div className="p-6">
                  <p className="text-sm text-cc-gold font-medium mb-2">Private Placement</p>
                  <h3 className="text-xl font-bold mb-2">USD 25 Million</h3>
                  <p className="text-gray-600 mb-4">Growth equity for an emerging healthcare provider</p>
                  <p className="text-gray-500 text-sm">Financial Advisor</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Client Testimonial */}
          <div className="my-16">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-cc-gold">
              <div className="flex flex-col items-center text-center">
                <blockquote className="italic text-lg mb-6">
                  "Constant Capital's expertise was instrumental in helping us successfully complete our bond issuance. Their team provided valuable guidance throughout the process and delivered exceptional results despite challenging market conditions."
                </blockquote>
                <div className="font-medium text-cc-navy">
                  — Chief Financial Officer, Leading Ghanaian Corporate
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Capital Raising Needs?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Contact our Capital Markets team today to explore how we can help you achieve your financing objectives.
            </p>
            <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold text-lg px-8 py-6">
              <Link to="/contact" className="flex items-center">
                Contact Our Capital Markets Team <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CapitalMarkets;
