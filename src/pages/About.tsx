import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Building, Briefcase, Handshake, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-cc-navy text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-pattern dark:opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif">
                About Constant Capital
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl">
                Constant Capital (Ghana) Limited is a registered broker-dealer and investment advisor, licensed and regulated by the Securities and Exchange Commission (SEC). We are a licensed dealing member of the Ghana Stock Exchange (GSE) and a depository participant (DP) at the Central Securities Depository (CSD). We are committed to meeting the diverse needs of our clients through the provision of a full array of innovative and customized financial solutions to international standards.
              </p>
              <Link to="/leadership">
                <Button className="bg-cc-gold hover:bg-cc-gold/90 text-white text-base">
                  Meet Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-cc-navy/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-cc-navy dark:text-white mb-6 font-serif">
                  A Tradition of Excellence in Financial Services
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Founded in Ghana, Constant Capital has grown to become a trusted name in West African finance. Our deep 
                  understanding of local markets, combined with international expertise, allows us to offer innovative 
                  financial solutions that create lasting value.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  We are committed to the highest standards of integrity, transparency, and professional excellence in 
                  all our dealings, ensuring that our clients' interests always come first.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/3722b840-57e0-4fc4-8378-9ee194fd4491.png" 
                  alt="Constant Capital Office" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-cc-light-blue dark:bg-cc-navy/70">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-12">
              <h2 className="text-3xl font-bold text-cc-navy dark:text-white mb-4 font-serif">Our Core Values</h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
                These principles guide everything we do as we strive to be the premier investment banking firm in West Africa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white dark:bg-cc-navy/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cc-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-cc-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-cc-navy dark:text-white mb-2">Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We are committed to delivering exceptional results and maintaining the highest standards in everything we do.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-cc-navy/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cc-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="w-8 h-8 text-cc-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-cc-navy dark:text-white mb-2">Integrity</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We uphold the highest ethical standards, ensuring transparency and honesty in all our interactions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-cc-navy/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cc-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-cc-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-cc-navy dark:text-white mb-2">Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We constantly seek new and better solutions to meet the evolving needs of our clients and markets.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-cc-navy/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cc-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-cc-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-cc-navy dark:text-white mb-2">Client Focus</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We prioritize our clients' interests, building long-term relationships based on trust and mutual success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section - with new design */}
        <section className="py-16 md:py-24 bg-white dark:bg-cc-navy/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="bg-gradient-to-br from-cc-light-blue to-white p-8 rounded-lg shadow-lg dark:from-cc-navy dark:to-cc-navy/90 dark:border dark:border-cc-gold/20">
                <div className="flex items-center mb-6">
                  <Building className="w-8 h-8 text-cc-gold mr-4" />
                  <h2 className="text-2xl font-bold text-cc-navy dark:text-white font-serif">Our Vision</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  To be the premier investment bank in West Africa, known for excellence in financial services and commitment to our clients' success, setting the standard for innovation and integrity in the markets we serve.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-cc-gray to-white p-8 rounded-lg shadow-lg dark:from-cc-navy dark:to-cc-navy/90 dark:border dark:border-cc-gold/20">
                <div className="flex items-center mb-6">
                  <Briefcase className="w-8 h-8 text-cc-gold mr-4" />
                  <h2 className="text-2xl font-bold text-cc-navy dark:text-white font-serif">Our Mission</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  To provide innovative financial solutions that create lasting value for our clients while maintaining the highest standards of integrity and professionalism, contributing to the growth and development of African capital markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-cc-navy text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 font-serif">Ready to Experience Financial Excellence?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Whether you're looking for investment opportunities, securities trading, or strategic financial advice, our team is ready to help you achieve your financial goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/leadership">
                  <Button className="bg-white text-cc-navy hover:bg-gray-100 w-full sm:w-auto">
                    Meet Our Team
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="bg-cc-gold hover:bg-cc-gold/90 text-white w-full sm:w-auto">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
