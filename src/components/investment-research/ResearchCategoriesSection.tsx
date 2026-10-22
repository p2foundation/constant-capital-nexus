
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, TrendingUp, FileText, Globe } from 'lucide-react';

const ResearchCategoriesSection = () => {
  return (
    <div className="my-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Coverage</p>
      <h2 className="font-heading mb-4 text-3xl font-bold mb-8 text-foreground">Our Research Coverage</h2>
      
      <Tabs defaultValue="equity" className="w-full">
        <TabsList className="mb-8 grid h-auto w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="equity" className="py-3 text-base">Equity Research</TabsTrigger>
          <TabsTrigger value="macro" className="py-3 text-base">Macro Analysis</TabsTrigger>
          <TabsTrigger value="sector" className="py-3 text-base">Sector Reports</TabsTrigger>
          <TabsTrigger value="thematic" className="py-3 text-base">Thematic Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equity" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Equity Research</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Comprehensive coverage of listed companies across African markets with detailed financial analysis, 
                valuation models, and investment recommendations.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Company initiation reports with detailed business model analysis</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Quarterly earnings analysis and forecast updates</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Valuation models using multiple methodologies</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Buy/Hold/Sell recommendations with target prices</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Banking Sector Focus</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Deep coverage of major banks including asset quality analysis, 
                    profitability drivers, and regulatory impact assessments.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Consumer Goods Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Coverage of FMCG companies, retail chains, and consumer 
                    discretionary stocks with market share analysis.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Telecommunications Sector</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Analysis of telecom operators, mobile money growth, 
                    and digital transformation trends.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="macro" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Macroeconomic Analysis</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Comprehensive economic research covering fiscal policy, monetary policy, and structural 
                economic trends across Ghana and West Africa.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Quarterly economic outlook reports</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Inflation and interest rate forecasts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Currency analysis and FX forecasts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Government policy impact analysis</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Economic Indicators Dashboard</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Real-time tracking of key economic indicators including 
                    GDP growth, inflation, and trade balance.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Policy Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    In-depth analysis of fiscal and monetary policy 
                    decisions and their market implications.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sector" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Sector Analysis</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Detailed sector reports examining industry dynamics, competitive landscapes, 
                and investment opportunities across key economic sectors.
              </p>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center flex items-center rounded-xl border border-border bg-background p-3">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Banking & Financial Services</span>
                </div>
                <div className="flex items-center flex items-center rounded-xl border border-border bg-background p-3">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Energy & Utilities</span>
                </div>
                <div className="flex items-center flex items-center rounded-xl border border-border bg-background p-3">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Consumer Goods & Retail</span>
                </div>
                <div className="flex items-center flex items-center rounded-xl border border-border bg-background p-3">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Telecommunications</span>
                </div>
                <div className="flex items-center flex items-center rounded-xl border border-border bg-background p-3">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Mining & Resources</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Sector Performance Tracking</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Monthly sector performance reports with relative 
                    valuation analysis and investment recommendations.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Industry Deep Dives</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive industry analysis including market 
                    sizing, competitive dynamics, and growth drivers.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="thematic" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-accent mr-2" />
                <h3 className="text-2xl font-bold text-foreground">Thematic Research</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Forward-looking research on emerging trends, structural changes, and 
                investment themes shaping African markets.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Digital transformation and fintech adoption</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">ESG investing and sustainable finance</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">AfCFTA impact on trade and investment</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Infrastructure development opportunities</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Future of Finance in Africa</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Research on digital banking, mobile money, and 
                    cryptocurrency adoption across the continent.
                  </p>
                </CardHeader>
              </Card>
              <Card className="border-border">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-foreground">Climate & ESG Investing</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Analysis of climate risks, green finance opportunities, 
                    and ESG implementation in African markets.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchCategoriesSection;
