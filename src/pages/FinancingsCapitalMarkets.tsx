
import React from 'react';
import PageHero from '@/components/layout/PageHero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, Banknote, LineChart, Building, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const FinancingsCapitalMarkets = () => {
  useAnalytics();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <PageHero
          eyebrow="Licensed Primary Dealer"
          title={<>Primary Dealership &amp; <span className="text-accent">Capital Markets</span></>}
          description="Primary-market participation for individuals and institutions, together with capital-raising solutions across debt and equity markets."
          primaryCta={{ label: 'Open an Investment Account', to: '/account-opening' }}
          secondaryCta={{ label: 'Contact Our Team', to: '/contact' }}
          icon={Banknote}
          highlights={['Licensed Primary Dealer', 'Individuals and institutions', 'Government securities', 'Debt and equity offerings']}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading text-foreground">Capital Markets Excellence</h2>
              <p className="mb-6 text-muted-foreground">
                Our Financings & Capital Markets practice offers comprehensive solutions for businesses seeking to raise capital through public or private markets. We leverage our deep understanding of Ghana's financial ecosystem and broader African markets to provide tailored financing strategies that meet your specific needs.
              </p>
              <p className="mb-8 text-muted-foreground">
                With decades of collective experience, our team delivers exceptional guidance through complex capital raising processes, ensuring optimal outcomes for our clients. Whether you're considering an IPO, debt issuance, private placement, or restructuring, we provide end-to-end support through every stage of the transaction.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact" className="flex items-center">
                  Discuss Your Capital Needs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <img 
                src="/lovable-uploads/5d82ecc8-34e0-4284-9c90-434650eaf740.png" 
                alt="Capital Markets" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Services Tabs */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground font-heading">Our Financing Solutions</h2>
            
            <Tabs defaultValue="equity" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="equity" className="text-lg py-3">Equity Capital</TabsTrigger>
                <TabsTrigger value="debt" className="text-lg py-3">Debt Capital</TabsTrigger>
                <TabsTrigger value="restructuring" className="text-lg py-3">Restructuring</TabsTrigger>
                <TabsTrigger value="advisory" className="text-lg py-3">Market Advisory</TabsTrigger>
              </TabsList>
              
              <TabsContent value="equity" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Equity Capital Markets</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our equity capital markets team provides comprehensive assistance for companies looking to raise capital through equity offerings, whether through public markets or private placements.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Initial Public Offerings (IPOs)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Follow-on Offerings</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Private Placements</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Rights Issues</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Recent Transaction Highlights</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">GHS 250M IPO</h5>
                          <p className="text-sm text-muted-foreground">Led the successful listing of a leading financial institution on the Ghana Stock Exchange</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">GHS 150M Rights Issue</h5>
                          <p className="text-sm text-muted-foreground">Structured and executed a rights issue for a major manufacturing company</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">USD 75M Private Placement</h5>
                          <p className="text-sm text-muted-foreground">Facilitated equity investment for an expanding energy company</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="debt" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Banknote className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Debt Capital Markets</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our debt capital markets team helps clients access funding through various debt instruments, providing guidance on structure, pricing, and market placement.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Corporate Bonds</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Eurobonds</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Medium-Term Notes</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Structured Finance Solutions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Recent Debt Transactions</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">GHS 500M Corporate Bond</h5>
                          <p className="text-sm text-muted-foreground">Arranged multi-tranche bond issuance for infrastructure financing</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">USD 100M Eurobond</h5>
                          <p className="text-sm text-muted-foreground">Co-managed international bond offering for a financial institution</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">GHS 200M Medium-Term Note Program</h5>
                          <p className="text-sm text-muted-foreground">Established flexible debt program for a major retail company</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="restructuring" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Building className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Restructuring & Recapitalization</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      We provide expert guidance through complex financial restructurings, helping businesses optimize their capital structure and navigate challenging financial situations.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Debt Restructuring</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Balance Sheet Optimization</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Distressed Financing</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Turnaround Advisory</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Our Approach</h4>
                    <p className="mb-4 text-muted-foreground">
                      Our restructuring approach combines financial expertise with practical business knowledge:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center border-b border-border pb-4">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">1</div>
                        <div>
                          <h5 className="font-medium ">Comprehensive Analysis</h5>
                          <p className="text-sm text-muted-foreground">Deep dive into financial position and options</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-border pb-4">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">2</div>
                        <div>
                          <h5 className="font-medium ">Strategic Planning</h5>
                          <p className="text-sm text-muted-foreground">Developing tailored solutions aligned with business goals</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-border pb-4">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">3</div>
                        <div>
                          <h5 className="font-medium ">Stakeholder Negotiation</h5>
                          <p className="text-sm text-muted-foreground">Expert management of creditor and investor discussions</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">4</div>
                        <div>
                          <h5 className="font-medium ">Implementation & Monitoring</h5>
                          <p className="text-sm text-muted-foreground">Execution support and ongoing guidance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advisory" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <LineChart className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Capital Markets Advisory</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      We provide strategic advice on capital markets positioning, investor relations, and market timing to help clients optimize their approach to raising capital.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Market Intelligence & Timing</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Investor Relations Strategy</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Pre-IPO Advisory</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Regulatory Navigation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Advisory Services</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-heading text-foreground">Market Positioning</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground">Strategic guidance on positioning your offering for market success</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-heading text-foreground">Investor Relations</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground">Building and maintaining relationships with institutional investors</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-heading text-foreground">Pre-Transaction Readiness</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground">Comprehensive preparation for capital markets transactions</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-heading text-foreground">Regulatory Advisory</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground">Guidance on compliance with securities regulations</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Why Choose Us */}
          <div className="my-16 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-3xl font-bold mb-8 text-foreground font-heading">Why Choose Our Capital Markets Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2 ">Market Leadership</h3>
                <p className="text-muted-foreground">
                  Recognized leadership in Ghana's capital markets with a strong track record of successful transactions.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Banknote className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2 ">Innovative Solutions</h3>
                <p className="text-muted-foreground">
                  Creative approaches to capital raising that address unique market challenges and opportunities.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2 ">Industry Expertise</h3>
                <p className="text-muted-foreground">
                  Deep knowledge of key sectors including financial services, energy, infrastructure, and consumer goods.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="bg-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <LineChart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2 ">Results-Driven</h3>
                <p className="text-muted-foreground">
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

export default FinancingsCapitalMarkets;
