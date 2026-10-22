
import React, { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, TrendingUp, BarChart3, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeamMemberCard from '@/components/private-equity/TeamMemberCard';
import TeamMemberModal from '@/components/private-equity/TeamMemberModal';
import { privateEquityTeam } from '@/data/privateEquityTeam';

const PrivateEquity = () => {
  useAnalytics();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(null);

  const handleMemberClick = (index: number) => {
    setSelectedMemberIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedMemberIndex(null);
  };

  const handleNextMember = () => {
    if (selectedMemberIndex !== null) {
      setSelectedMemberIndex((selectedMemberIndex + 1) % privateEquityTeam.length);
    }
  };

  const handlePrevMember = () => {
    if (selectedMemberIndex !== null) {
      setSelectedMemberIndex(selectedMemberIndex === 0 ? privateEquityTeam.length - 1 : selectedMemberIndex - 1);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <PageHero
          eyebrow="Growth Capital"
          title={<>Private <span className="text-accent">Equity</span></>}
          description="Alternative investment solutions providing growth capital for promising businesses across key sectors in Ghana and Africa."
          primaryCta={{ label: 'Discuss an Investment', to: '/contact' }}
          secondaryCta={{ label: 'Explore Research', to: '/research' }}
          icon={Briefcase}
          highlights={['Growth equity investments', 'Sector-focused deal sourcing', 'Hands-on value creation', 'Strategic partnerships']}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading text-foreground">Capital & Expertise</h2>
              <p className="mb-6 text-muted-foreground">
                Our Private Equity practice provides growth capital and strategic guidance to promising businesses across Ghana and broader African markets. We partner with management teams to accelerate growth, improve operational efficiency, and create sustainable value.
              </p>
              <p className="mb-8 text-muted-foreground">
                With deep sector expertise and a hands-on approach, we help portfolio companies navigate challenges, capitalize on opportunities, and achieve their full potential. Our investment strategy focuses on high-potential businesses in sectors poised for growth, where our capital and expertise can drive meaningful transformation.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact" className="flex items-center">
                  Discuss Investment Opportunities <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <img 
                src="/lovable-uploads/1f153fc7-d536-4eab-8f5c-6527267e1769.png" 
                alt="Private Equity" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Investment Approach */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground font-heading">Our Investment Approach</h2>
            
            <Tabs defaultValue="strategy" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="strategy" className="text-lg py-3">Investment Strategy</TabsTrigger>
                <TabsTrigger value="sectors" className="text-lg py-3">Target Sectors</TabsTrigger>
                <TabsTrigger value="process" className="text-lg py-3">Investment Process</TabsTrigger>
                <TabsTrigger value="value" className="text-lg py-3">Value Creation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="strategy" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Investment Strategy</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our investment strategy is centered on providing growth capital to established businesses with strong fundamentals and significant potential for expansion.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Minority and majority investments</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Established businesses with proven business models</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Focus on Ghana and select African markets</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Partnership approach with management teams</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Typical investment period of 4-7 years</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Investment Criteria</h4>
                    <div className="space-y-4">
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base ">Company Size</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Businesses with annual revenues between $5 million and $50 million
                          </p>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base ">Investment Size</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Typical equity investments ranging from $2 million to $15 million
                          </p>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base ">Growth Potential</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Companies with significant expansion opportunities and scalable business models
                          </p>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base ">Management</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Strong management teams with proven track records and aligned interests
                          </p>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sectors" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Building className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Target Sectors</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      We focus our investments on sectors with strong growth fundamentals driven by favorable demographic trends, increasing consumer spending, and structural economic shifts across Africa.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Financial Services</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Consumer & Retail</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Healthcare</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Education</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Technology & Digital Services</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Agribusiness & Food Processing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Sector Investment Theses</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">Financial Services</h5>
                          <p className="text-sm text-muted-foreground">Investing in financial inclusion, digital banking, and innovative financial solutions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">Healthcare</h5>
                          <p className="text-sm text-muted-foreground">Supporting the expansion of quality healthcare services, pharmaceutical distribution, and health technology</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">Consumer & Retail</h5>
                          <p className="text-sm text-muted-foreground">Capitalizing on the growing middle class and increasing consumer spending power</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-accent/10 p-2 rounded-full mr-3 shrink-0 text-accent">
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h5 className="font-medium ">Technology</h5>
                          <p className="text-sm text-muted-foreground">Investing in digital transformation, fintech, and technology enablement across sectors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="process" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Investment Process</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      Our disciplined investment process ensures thorough evaluation of opportunities and effective post-investment management to drive value creation.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Deal Sourcing & Screening</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Initial Due Diligence</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Detailed Due Diligence</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Investment Committee Approval</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Transaction Execution</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Portfolio Management</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Exit Planning & Execution</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Our Investment Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-center border-b border-border pb-4">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">1</div>
                        <div>
                          <h5 className="font-medium ">Initial Screening & Engagement</h5>
                          <p className="text-sm text-muted-foreground">1-2 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-border pb-4">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">2</div>
                        <div>
                          <h5 className="font-medium ">Preliminary Due Diligence</h5>
                          <p className="text-sm text-muted-foreground">2-4 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-border pb-4">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">3</div>
                        <div>
                          <h5 className="font-medium ">Comprehensive Due Diligence</h5>
                          <p className="text-sm text-muted-foreground">4-8 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center border-b border-border pb-4">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">4</div>
                        <div>
                          <h5 className="font-medium ">Final Negotiation & Closing</h5>
                          <p className="text-sm text-muted-foreground">2-4 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center text-accent-foreground font-bold mr-3">5</div>
                        <div>
                          <h5 className="font-medium ">Active Portfolio Management</h5>
                          <p className="text-sm text-muted-foreground">4-7 years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="value" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Users className="h-6 w-6 text-accent mr-2" />
                      <h3 className="text-2xl font-bold font-heading text-foreground">Value Creation</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      We take an active approach to value creation, working closely with portfolio companies to implement strategic initiatives that drive sustainable growth and operational excellence.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Strategic Guidance & Direction</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Operational Improvement</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Financial Management & Optimization</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Access to Networks & Partnerships</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Talent Acquisition & Development</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">M&A and Geographic Expansion</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="text-lg font-semibold mb-4 ">Value Creation Framework</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">Strategic Growth</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-muted-foreground">Market expansion, new product development, and strategic acquisitions</p>
                          </CardContent>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">Operational Excellence</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-muted-foreground">Process optimization, cost efficiency, and quality improvement</p>
                          </CardContent>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">Financial Structure</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-muted-foreground">Capital structure optimization and financial performance management</p>
                          </CardContent>
                        </CardHeader>
                      </Card>
                      <Card className="border border-border">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base font-medium ">Governance & People</CardTitle>
                          <CardContent className="p-0 pt-2">
                            <p className="text-sm text-muted-foreground">Strengthening management teams and governance frameworks</p>
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
          <div className="my-16 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-3xl font-bold mb-8 text-foreground font-heading">Portfolio Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="h-48 rounded-xl mb-4 overflow-hidden bg-muted">
                  <img src="/placeholder.svg" alt="Company A" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 ">FinTech Solutions Inc.</h3>
                <p className="text-sm text-gray-700 mb-2 text-muted-foreground">Financial Services | Ghana</p>
                <p className="text-gray-600 mb-4 text-muted-foreground">
                  Leading provider of digital payment solutions for businesses across West Africa.
                </p>
                <div className="text-sm text-muted-foreground">
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
              
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="h-48 rounded-xl mb-4 overflow-hidden bg-muted">
                  <img src="/placeholder.svg" alt="Company B" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 ">MediCare Group</h3>
                <p className="text-sm text-gray-700 mb-2 text-muted-foreground">Healthcare | Nigeria</p>
                <p className="text-gray-600 mb-4 text-muted-foreground">
                  Network of outpatient clinics providing affordable healthcare services in urban areas.
                </p>
                <div className="text-sm text-muted-foreground">
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
              
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="h-48 rounded-xl mb-4 overflow-hidden bg-muted">
                  <img src="/placeholder.svg" alt="Company C" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 ">AgriTech Ventures</h3>
                <p className="text-sm text-gray-700 mb-2 text-muted-foreground">Agribusiness | Ghana</p>
                <p className="text-gray-600 mb-4 text-muted-foreground">
                  Technology-enabled agricultural company improving farmer productivity and market access.
                </p>
                <div className="text-sm text-muted-foreground">
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
          
          {/* Investment Team */}
          <div className="my-16">
            <div className="text-left mb-12">
              <div className="text-accent dark:text-cc-orange uppercase tracking-wide font-medium mb-2">OUR EXPERTS</div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">Investment Team</h2>
              <p className="max-w-2xl text-muted-foreground">
                Our private equity team combines deep financial expertise with local market knowledge and operational experience to support portfolio companies through their growth journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {privateEquityTeam.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  member={member}
                  onClick={() => handleMemberClick(index)}
                />
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Partner with Constant Capital</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Whether you're seeking growth capital for your business or looking to invest alongside us, our team is ready to explore opportunities for collaboration.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6">
                <Link to="/contact" className="flex items-center">
                  Discuss Investment Opportunities <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                <Link to="/contact" className="flex items-center">
                  Submit Investment Proposal <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Modal */}
      {selectedMemberIndex !== null && (
        <TeamMemberModal
          member={privateEquityTeam[selectedMemberIndex]}
          isOpen={selectedMemberIndex !== null}
          onClose={handleCloseModal}
          onNext={handleNextMember}
          onPrev={handlePrevMember}
          currentIndex={selectedMemberIndex}
          totalMembers={privateEquityTeam.length}
        />
      )}

      <Footer />
    </div>
  );
};

export default PrivateEquity;
