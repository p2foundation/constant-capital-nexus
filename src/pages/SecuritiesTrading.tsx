
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChartLine, TrendingUp, BarChart3, AreaChart } from 'lucide-react';

const SecuritiesTrading = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-cc-navy text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Securities Trading</h1>
              <p className="text-lg md:text-xl mb-8">
                Access global markets with our advanced trading solutions and expert execution services.
              </p>
              <div className="flex items-center">
                <ChartLine className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Trusted by leading institutions and individual investors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy">Our Trading Services</h2>
              <p className="mb-6">
                Our Securities Trading division offers comprehensive trading services across multiple asset classes, providing our clients with access to the Ghana Stock Exchange and other African markets. Our experienced team of traders combines deep market knowledge with advanced execution technologies to deliver optimal results.
              </p>
              <p className="mb-6">
                We provide institutional and corporate clients with competitive commission rates, efficient trade execution, and valuable market insights to help them make informed investment decisions.
              </p>
              
              <h3 className="text-2xl font-bold mt-10 mb-4 text-cc-navy">Markets We Cover</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
                  <span>Ghana Stock Exchange (GSE)</span>
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
                  <span>Nigerian Stock Exchange (NGX)</span>
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
                  <span>Johannesburg Stock Exchange (JSE)</span>
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
                  <span>Nairobi Securities Exchange (NSE)</span>
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-cc-gold" />
                  <span>Egyptian Exchange (EGX)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-cc-navy">Why Choose Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 bg-cc-navy p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Expertise & Experience</h4>
                    <p className="text-gray-600">Our team has extensive knowledge of African markets and global financial trends.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-cc-navy p-3 rounded-full">
                    <AreaChart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Advanced Technology</h4>
                    <p className="text-gray-600">State-of-the-art trading platforms and execution systems.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-cc-navy p-3 rounded-full">
                    <ChartLine className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Market Insights</h4>
                    <p className="text-gray-600">Regular market updates and investment research to guide your decisions.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium mb-4">Ready to start trading?</h4>
                <button className="bg-cc-navy hover:bg-blue-900 text-white font-medium py-3 px-6 rounded">
                  Contact Our Trading Desk
                </button>
              </div>
            </div>
          </div>
          
          {/* Client Testimonial */}
          <div className="mt-16 bg-cc-navy/5 p-8 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-medium mb-4 text-cc-navy">Client Testimonial</h3>
              <blockquote className="italic text-lg mb-4">
                "Constant Capital's trading team consistently delivers excellent execution and valuable market insights. Their knowledge of African markets has been instrumental to our investment success."
              </blockquote>
              <div className="font-medium">
                — Investment Director, Leading Pension Fund
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SecuritiesTrading;
