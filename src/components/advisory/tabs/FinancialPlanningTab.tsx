import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Discovery & Goal Setting',
    description: 'Understanding your financial situation, objectives, and priorities',
  },
  {
    title: 'Strategy Development',
    description: 'Creating tailored strategies aligned with your goals',
  },
  {
    title: 'Implementation',
    description: 'Executing recommendations across various financial aspects',
  },
  {
    title: 'Monitoring & Review',
    description: 'Regular reviews and adjustments as circumstances change',
  },
];

const FinancialPlanningTab = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-foreground">Financial Planning</h3>
        </div>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Our comprehensive financial planning service helps you create a roadmap to achieve your short and long-term financial goals. We analyze your current financial situation and develop strategies tailored to your specific needs.
        </p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Retirement planning and pension optimization</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Estate planning and wealth transfer strategies</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Tax efficiency planning for investments</span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-muted-foreground">Liquidity management and cash flow analysis</span>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h4 className="mb-6 font-semibold text-foreground">Planning Process</h4>
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={step.title} className={index < steps.length - 1 ? 'flex items-center border-b border-border pb-5' : 'flex items-center'}>
              <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">
                {index + 1}
              </div>
              <div>
                <h5 className="font-medium text-foreground">{step.title}</h5>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialPlanningTab;
