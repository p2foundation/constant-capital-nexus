import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileBarChart, Scale, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageGenerator from '@/components/ImageGenerator';

const CapitalMarkets = () => {
  const [heroImage, setHeroImage] = useState("/lovable-uploads/3fc68d60-e7df-422c-9755-36b00cb55a95.png");

  const handleImageGenerated = (imageUrl: string) => {
    setHeroImage(imageUrl);
  };

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
                Expertise in structuring and executing debt and equity offerings, providing tailored capital raising solutions for businesses across various sectors.
              </p>
              <div className="flex items-center">
                <FileBarChart className="h-6 w-6 mr-2 text-cc-gold" />
                <p className="font-medium">Specialized in African Capital Markets</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Capital Raising Solutions</h2>
              <p className="mb-6 dark:text-gray-300">
                We provide comprehensive capital raising solutions through debt and equity offerings, assisting businesses in securing the necessary funding to achieve their strategic objectives.
              </p>
              <p className="mb-8 dark:text-gray-300">
                With deep expertise in African capital markets, our team works closely with clients to structure and execute tailored financing strategies that align with their specific needs and market conditions.
              </p>
              <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
                <Link to="/contact" className="flex items-center">
                  Discuss Your Financing Needs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" 
                alt="Professional Financial Team Meeting" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
          
          {/* Key Services */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-cc-navy text-left dark:text-white">Our Key Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Scale className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Equity Offerings</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Assisting companies in raising capital through the issuance of new shares, providing access to growth funding and enhanced market visibility.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Initial Public Offerings (IPOs)</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Follow-On Offerings</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Private Placements</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Debt Financings</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Structuring and arranging debt financing solutions, including bonds, loans, and other credit facilities, to meet diverse funding requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Corporate Bonds</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Syndicated Loans</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Project Finance</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center mb-4">
                  <FileBarChart className="h-6 w-6 text-cc-gold mr-2" />
                  <h3 className="text-lg font-bold text-cc-navy dark:text-white">Advisory Services</h3>
                </div>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Providing expert advisory services on capital structure optimization, financial modeling, and transaction execution.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Capital Structure Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Financial Projections</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-cc-gold mr-2" />
                    <span>Transaction Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Image Generator */}
          {/* <div className="my-8 text-center">
            <ImageGenerator onImageGenerated={handleImageGenerated} buttonText="Generate New Hero Image" />
          </div> */}
          
          {/* Testimonial */}
          <div className="my-16">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-cc-gold dark:bg-gray-700 dark:border-cc-gold">
              <div className="flex flex-col items-center text-center">
                <blockquote className="italic text-lg mb-6 dark:text-white">
                  "Constant Capital's expertise in capital markets was instrumental in our successful bond issuance. Their guidance and support throughout the process were invaluable."
                </blockquote>
                <div className="font-medium text-cc-navy dark:text-cc-gold">
                  — CFO, Leading Ghanaian Energy Company
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Unlock Your Capital Potential?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our capital markets team is ready to help you navigate the complexities of financing and achieve your strategic goals.
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

export default CapitalMarkets;
