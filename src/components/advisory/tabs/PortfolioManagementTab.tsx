import React from 'react';
import { PieChart, ArrowRight } from 'lucide-react';

const PortfolioManagementTab = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <PieChart className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-foreground">Portfolio Management</h3>
        </div>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Our portfolio management service offers active management of your investment assets based on your specific goals and risk tolerance. We construct diversified portfolios across asset classes, geographies, and sectors to optimize returns while managing risk.
        </p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Customized portfolio construction and ongoing management</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Strategic asset allocation and tactical adjustments</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Regular portfolio reviews and rebalancing</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Performance reporting and detailed analytics</span>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h4 className="mb-4 font-semibold text-foreground">Our Approach</h4>
        <p className="mb-6 text-muted-foreground">
          We utilize a disciplined investment process that combines fundamental research with quantitative analysis to identify opportunities across global markets, focusing on:
        </p>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground">Long-term Perspective</h5>
              <p className="text-sm text-muted-foreground">Strategic allocations based on long-term economic and market forecasts</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground">Tactical Flexibility</h5>
              <p className="text-sm text-muted-foreground">Adjusting positions to capitalize on short-term market inefficiencies</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground">Risk Management</h5>
              <p className="text-sm text-muted-foreground">Sophisticated risk controls to protect capital in various market environments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagementTab;
