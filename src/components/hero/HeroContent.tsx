import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroContent = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
        <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs sm:text-sm font-medium uppercase tracking-wide text-foreground">
          SEC Licensed · Primary Dealer
        </span>
      </div>

      <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
        Ghana's Premier <span className="text-accent">Investment</span> &amp; Capital Markets Partner
      </h1>

      <p className="max-w-xl text-lg md:text-xl leading-relaxed text-muted-foreground">
        Navigating West Africa's financial landscape with precision. We deliver expert brokerage,
        FX solutions and strategic advisory for institutional and private investors.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
        <Link
          to="/account-opening"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent/90"
        >
          Open Account <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          to="/research"
          className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 font-bold text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
        >
          Explore Research
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
