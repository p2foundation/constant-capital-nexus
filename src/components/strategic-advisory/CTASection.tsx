import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="my-16 flex flex-col items-center justify-between gap-6 rounded-2xl bg-accent p-8 text-accent-foreground sm:flex-row lg:p-10">
      <div>
        <h2 className="font-heading mb-2 text-2xl font-bold">Ready to Transform Your Business?</h2>
        <p className="max-w-xl text-sm opacity-90">
          Our strategic advisory team is ready to help you navigate complex business challenges and capitalize on opportunities for growth and value creation.
        </p>
      </div>
      <Link
        to="/contact"
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-background px-8 py-3 font-bold text-foreground transition-transform hover:scale-105"
      >
        Schedule a Strategy Session <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default CTASection;
