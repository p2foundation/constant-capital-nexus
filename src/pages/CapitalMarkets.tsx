import React, { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <PageHero
          eyebrow="Licensed Primary Dealer"
          title={<>Primary Dealership &amp; <span className="text-accent">Capital Markets</span></>}
          description="Direct participation in Government of Ghana securities for individuals and institutions, alongside tailored debt and equity capital-raising solutions."
          primaryCta={{ label: 'Open an Investment Account', to: '/account-opening' }}
          secondaryCta={{ label: 'Open Primary Portal', to: 'https://auction.constantcap.com.gh' }}
          icon={FileBarChart}
          highlights={['Licensed Primary Dealer', 'Individuals and institutions welcome', 'Government securities access', 'Debt and equity financing']}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-16 grid gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-2 lg:p-8">
            <div>
              <p className="text-sm font-semibold uppercase text-accent">Primary market</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Participate through our Primary Dealer licence</h2>
              <p className="mt-3 text-muted-foreground">Individuals and institutions can access eligible Government of Ghana primary-market opportunities through Constant Capital.</p>
              <Button asChild className="mt-5"><a href="https://auction.constantcap.com.gh" target="_blank" rel="noreferrer">Open primary-dealership portal <ArrowRight /></a></Button>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase text-accent">Secondary market</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Trade through the Constrade web app</h2>
              <p className="mt-3 text-muted-foreground">Use our secondary-market channel after completing your account onboarding and KYC.</p>
              <Button asChild variant="outline" className="mt-5"><a href="https://trading.constantcap.com.gh" target="_blank" rel="noreferrer">Open secondary-market app <ArrowRight /></a></Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading text-foreground">Capital Raising Solutions</h2>
              <p className="mb-6 text-muted-foreground">
                We provide comprehensive capital raising solutions through debt and equity offerings, assisting businesses in securing the necessary funding to achieve their strategic objectives.
              </p>
              <p className="mb-8 text-muted-foreground">
                With deep expertise in African capital markets, our team works closely with clients to structure and execute tailored financing strategies that align with their specific needs and market conditions.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact" className="flex items-center">
                  Discuss Your Financing Needs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" 
                alt="Professional Financial Team Meeting" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
          
          {/* Key Services */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground font-heading">Our Key Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="flex items-center mb-4">
                  <Scale className="h-6 w-6 text-accent mr-2" />
                  <h3 className="text-lg font-bold font-heading text-foreground">Equity Offerings</h3>
                </div>
                <p className="text-gray-600 mb-4 text-muted-foreground">
                  Assisting companies in raising capital through the issuance of new shares, providing access to growth funding and enhanced market visibility.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 text-muted-foreground">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Initial Public Offerings (IPOs)</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Follow-On Offerings</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Private Placements</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-6 w-6 text-accent mr-2" />
                  <h3 className="text-lg font-bold font-heading text-foreground">Debt Financings</h3>
                </div>
                <p className="text-gray-600 mb-4 text-muted-foreground">
                  Structuring and arranging debt financing solutions, including bonds, loans, and other credit facilities, to meet diverse funding requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 text-muted-foreground">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Corporate Bonds</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Syndicated Loans</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Project Finance</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="flex items-center mb-4">
                  <FileBarChart className="h-6 w-6 text-accent mr-2" />
                  <h3 className="text-lg font-bold font-heading text-foreground">Advisory Services</h3>
                </div>
                <p className="text-gray-600 mb-4 text-muted-foreground">
                  Providing expert advisory services on capital structure optimization, financial modeling, and transaction execution.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 text-muted-foreground">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Capital Structure Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
                    <span>Financial Projections</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-accent mr-2" />
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
            <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-8">
              <div className="flex flex-col items-center text-center">
                <blockquote className="italic text-lg mb-6 ">
                  "Constant Capital's expertise in capital markets was instrumental in our successful bond issuance. Their guidance and support throughout the process were invaluable."
                </blockquote>
                <div className="font-medium text-foreground">
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
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6">
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
