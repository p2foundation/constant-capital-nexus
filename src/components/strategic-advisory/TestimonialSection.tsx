import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <div className="my-16">
      <div className="relative mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 lg:p-10">
        <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Quote className="h-5 w-5" />
        </div>
        <blockquote className="mb-6 text-lg italic leading-relaxed text-muted-foreground">
          "The strategic advisory team at Constant Capital provided invaluable guidance during our company's transformational acquisition. Their deep industry knowledge and transaction expertise were instrumental in navigating a complex process and ensuring a successful outcome."
        </blockquote>
        <div className="border-l-2 border-accent pl-4 font-semibold text-foreground">
          CEO, Leading Ghanaian Manufacturing Company
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
