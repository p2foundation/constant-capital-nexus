import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <div className="mt-16">
      <div className="relative max-w-3xl rounded-2xl border border-border bg-card p-8 lg:p-10">
        <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Quote className="h-5 w-5" />
        </div>
        <blockquote className="mb-6 text-lg italic leading-relaxed text-muted-foreground">
          "Constant Capital's trading team consistently delivers excellent execution and valuable market insights. Their knowledge of African markets has been instrumental to our investment success."
        </blockquote>
        <div className="border-l-2 border-accent pl-4 font-semibold text-foreground">
          Investment Director, Leading Pension Fund
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
