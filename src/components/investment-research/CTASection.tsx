import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="my-16 flex flex-col items-center justify-between gap-6 rounded-2xl bg-accent p-8 text-accent-foreground lg:p-10">
      <div className="text-center sm:text-left">
        <h2 className="font-heading mb-2 text-2xl font-bold">Access Premium Research</h2>
        <p className="max-w-2xl text-sm opacity-90">
          Get exclusive access to our institutional-quality research reports, market insights, and investment recommendations.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          to="/research"
          className="inline-flex items-center justify-center rounded-full bg-background px-8 py-3 font-bold text-foreground transition-transform hover:scale-105"
        >
          Browse Research Reports <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full border border-background/40 px-8 py-3 font-bold text-accent-foreground transition-colors hover:bg-background/10"
        >
          Request Custom Research
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
