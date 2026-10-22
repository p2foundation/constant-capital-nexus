import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowLeftRight, Landmark, FileText, Briefcase, ArrowRight, Handshake } from 'lucide-react';

const services = [
  { title: 'Securities Trading', icon: BarChart3, link: '/securities-trading', description: 'Expert execution on the Ghana Stock Exchange and other African markets, with competitive commissions.' },
  { title: 'FX Trading', icon: ArrowLeftRight, link: '/fx-trading', description: 'Licensed foreign exchange with competitive rates and hedging solutions for businesses and institutions.' },
  { title: 'Primary Dealer & Capital Markets', icon: Landmark, link: '/capital-markets', description: 'Licensed primary-dealer access to Government of Ghana T-Bills and bonds for individuals and institutions.' },
  { title: 'Investment Research', icon: FileText, link: '/investment-research', description: 'Data-driven macro reports and equity analysis covering Ghana and emerging African markets.' },
  { title: 'Investment Advisory', icon: Briefcase, link: '/investment-advisory', description: 'Tailored portfolio strategies for institutions, family offices and high-net-worth investors.' },
  { title: 'Strategic Advisory & Private Equity', icon: Handshake, link: '/strategic-advisory', description: 'Guidance on mergers, acquisitions and restructuring, and growth capital for promising businesses.' },
];

const Services = () => (
  <section className="bg-background py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
      <div className="mb-14">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">What we do</p>
        <h2 className="font-heading mb-4 text-3xl font-bold text-foreground md:text-4xl">Comprehensive Solutions</h2>
        <div className="h-1.5 w-20 bg-accent" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map(({ title, icon: Icon, link, description }) => (
          <Link
            key={title}
            to={link}
            className="group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 lg:p-10"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading mb-3 text-xl font-bold text-card-foreground">{title}</h3>
            <p className="leading-relaxed text-muted-foreground">{description}</p>
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl bg-accent p-8 text-accent-foreground sm:flex-row lg:p-10">
        <h3 className="font-heading text-2xl font-bold">Ready to grow your wealth?</h3>
        <Link to="/account-opening" className="rounded-full bg-background px-8 py-3 font-bold text-foreground transition-transform hover:scale-105">
          Get Started Now
        </Link>
      </div>
    </div>
  </section>
);

export default Services;
