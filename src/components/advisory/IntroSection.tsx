import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const IntroSection = () => {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:items-center">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Why Constant Capital</p>
        <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Strategic Investment Solutions</h2>
        <div className="mb-6 h-1.5 w-20 bg-accent" />
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Our Investment Advisory team provides comprehensive wealth management and investment solutions tailored to meet the unique needs of our clients. We combine deep market expertise with personalized service to help you achieve your financial objectives.
        </p>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          Whether you're planning for retirement, building wealth, or managing institutional assets, our experienced advisors work closely with you to develop and implement strategies that align with your risk tolerance and investment goals.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 font-bold text-accent-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent/90"
        >
          Start Your Investment Journey <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <img
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
          alt="Investment Advisory Consultation"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default IntroSection;
