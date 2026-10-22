import React from 'react';
import { Building, ArrowRight } from 'lucide-react';

const industries = [
  {
    title: "Financial Services",
    description: "Extensive experience advising banks, insurance companies, and fintech firms on strategic initiatives and transactions.",
    services: ["Bank mergers and acquisitions", "Insurance company restructuring", "Fintech growth strategies"]
  },
  {
    title: "Energy & Resources",
    description: "Strategic advisory for traditional energy companies, renewable energy projects, and mining operations.",
    services: ["Oil and gas asset transactions", "Renewable energy market entry", "Mining company restructuring"]
  },
  {
    title: "Consumer & Retail",
    description: "Advisory services for consumer goods companies, retailers, and e-commerce businesses.",
    services: ["Retail expansion strategies", "Consumer brand acquisitions", "E-commerce transformation"]
  },
  {
    title: "Technology & Telecom",
    description: "Strategic guidance for technology companies, telecom operators, and media businesses.",
    services: ["Tech company growth strategies", "Telecom infrastructure transactions", "Digital media partnerships"]
  },
  {
    title: "Healthcare & Pharma",
    description: "Advisory services for healthcare providers, pharmaceutical companies, and medical device manufacturers.",
    services: ["Hospital group consolidation", "Pharmaceutical market entry", "Healthcare innovation strategies"]
  },
  {
    title: "Agriculture & Food",
    description: "Strategic guidance for agricultural businesses, food processors, and agtech companies.",
    services: ["Agribusiness expansion", "Food processing integration", "Sustainable agriculture ventures"]
  }
];

const IndustryExpertiseSection = () => {
  return (
    <div className="my-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Sectors</p>
      <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Industry Expertise</h2>
      <div className="mb-10 h-1.5 w-20 bg-accent" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <div
            key={industry.title}
            className="rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 lg:p-8"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{industry.title}</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {industry.description}
            </p>
            <ul className="space-y-1.5 text-sm">
              {industry.services.map((service) => (
                <li key={service} className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryExpertiseSection;
