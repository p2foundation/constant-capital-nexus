import React from 'react';
import { Users, Target, Globe } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our analysts combine international experience with deep local market knowledge and sector expertise.',
  },
  {
    icon: Target,
    title: 'Rigorous Analysis',
    description: 'We employ multiple valuation methodologies and stress-test our models against various scenarios.',
  },
  {
    icon: Globe,
    title: 'Local Context',
    description: 'Our research incorporates local market dynamics, regulatory environment, and cultural factors.',
  },
];

const ResearchApproachSection = () => {
  return (
    <div className="my-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Methodology</p>
      <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Our Research Approach</h2>
      <div className="mb-10 h-1.5 w-20 bg-accent" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="font-heading mb-2 text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchApproachSection;
