import React from 'react';
import { TrendingUp } from 'lucide-react';

const markets = [
  'Ghana Stock Exchange (GSE)',
  'Nigerian Stock Exchange (NGX)',
  'Johannesburg Stock Exchange (JSE)',
  'Nairobi Securities Exchange (NSE)',
  'Egyptian Exchange (EGX)',
];

const ServicesSection = () => {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">What we trade</p>
      <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Our Trading Services</h2>
      <div className="mb-6 h-1.5 w-20 bg-accent" />
      <p className="mb-6 leading-relaxed text-muted-foreground">
        Our Securities Trading division offers comprehensive trading services across multiple asset classes, providing our clients with access to the Ghana Stock Exchange and other African markets. Our experienced team of traders combines deep market knowledge with advanced execution technologies to deliver optimal results.
      </p>
      <p className="mb-8 leading-relaxed text-muted-foreground">
        We provide individual, institutional and corporate clients with competitive commission rates, efficient trade execution, and valuable market insights to help them make informed investment decisions.
      </p>

      <h3 className="font-heading mb-5 text-xl font-bold text-foreground">Markets We Cover</h3>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {markets.map((market) => (
          <li
            key={market}
            className="flex items-center rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent/50"
          >
            <TrendingUp className="mr-3 h-5 w-5 shrink-0 text-accent" />
            <span className="text-sm font-medium text-foreground">{market}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesSection;
