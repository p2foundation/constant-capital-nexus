import React from 'react';
import { PieChart, LineChart, BarChart3, Briefcase } from 'lucide-react';

const reasons = [
  {
    icon: PieChart,
    title: 'Expertise & Experience',
    description: 'Our advisors average 15+ years of investment experience across multiple market cycles.',
  },
  {
    icon: LineChart,
    title: 'Tailored Solutions',
    description: 'Customized strategies designed for your unique financial goals and circumstances.',
  },
  {
    icon: BarChart3,
    title: 'Research-Driven',
    description: 'Investment decisions backed by rigorous analysis and proprietary research.',
  },
  {
    icon: Briefcase,
    title: 'Client Focus',
    description: 'Dedicated advisors providing personalized attention and responsive service.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <div className="my-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Why us</p>
      <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Why Choose Our Advisory Services</h2>
      <div className="mb-10 h-1.5 w-20 bg-accent" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="font-heading mb-3 text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
