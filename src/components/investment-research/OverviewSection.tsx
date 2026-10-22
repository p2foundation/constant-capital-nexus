import React from 'react';

const OverviewSection = () => {
  return (
    <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Our research</p>
        <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Research Excellence</h2>
        <div className="mb-6 h-1.5 w-20 bg-accent" />
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Our Investment Research division provides institutional-quality analysis across African capital markets.
          We combine rigorous fundamental analysis with deep local market insights to deliver actionable
          investment recommendations.
        </p>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          From equity research to macroeconomic analysis, our team of experienced analysts covers key
          sectors and markets across Ghana and the broader African continent, helping clients identify
          opportunities and manage risks in dynamic emerging markets.
        </p>
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5 text-center">
            <div className="font-heading text-2xl font-bold text-accent">50+</div>
            <div className="text-sm text-muted-foreground">Companies Covered</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-center">
            <div className="font-heading text-2xl font-bold text-accent">15+</div>
            <div className="text-sm text-muted-foreground">Sectors Analyzed</div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-6">
        <img
          src="/lovable-uploads/749a8bb6-9f9d-4731-8233-2a3459f75e84.png"
          alt="Investment Research"
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default OverviewSection;
