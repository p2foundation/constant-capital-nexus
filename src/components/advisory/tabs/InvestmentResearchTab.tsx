import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowRight } from 'lucide-react';

const coverage = [
  { title: 'Equities', items: ['Ghana Stock Exchange', 'Nigeria Stock Exchange', 'Kenya Stock Exchange', 'South Africa JSE'] },
  { title: 'Fixed Income', items: ['Government Securities', 'Corporate Bonds', 'Eurobonds', 'Money Market'] },
  { title: 'Alternative Investments', items: ['Real Estate', 'Private Equity', 'Infrastructure'] },
  { title: 'Macro Analysis', items: ['Economic Indicators', 'Policy Analysis', 'Currency Forecasts'] },
];

const InvestmentResearchTab = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-foreground">Investment Research</h3>
        </div>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Our investment research provides in-depth analysis and insights to inform your investment decisions. Our team of analysts monitors global markets, economic trends, and individual securities to identify opportunities and risks.
        </p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Equity research and stock recommendations</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Fixed income and credit analysis</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Macroeconomic forecasts and market commentary</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Thematic research and emerging trends</span>
          </li>
        </ul>
        <Link
          to="/research"
          className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 font-bold text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
        >
          View Research Reports <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h4 className="mb-6 font-semibold text-foreground">Research Coverage</h4>
        <div className="grid grid-cols-2 gap-4">
          {coverage.map(({ title, items }) => (
            <div key={title} className="rounded-xl border border-border bg-background p-4">
              <h5 className="mb-2 font-medium text-foreground">{title}</h5>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentResearchTab;
