import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, AreaChart, ChartLine, ArrowRight } from 'lucide-react';

const reasons = [
  {
    icon: BarChart3,
    title: 'Expertise & Experience',
    description: 'Our team has extensive knowledge of African markets and global financial trends.',
  },
  {
    icon: AreaChart,
    title: 'Advanced Technology',
    description: 'State-of-the-art trading platforms and execution systems.',
  },
  {
    icon: ChartLine,
    title: 'Market Insights',
    description: 'Regular market updates and investment research to guide your decisions.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <h3 className="font-heading mb-8 text-2xl font-bold text-foreground">Why Choose Us</h3>

      <div className="space-y-6">
        {reasons.map(({ icon: Icon, title, description }) => (
          <div key={title} className="group flex items-start">
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-foreground">{title}</h4>
              <p className="leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h4 className="mb-4 font-bold text-foreground">Ready to start trading?</h4>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90"
        >
          Contact Our Trading Desk <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
