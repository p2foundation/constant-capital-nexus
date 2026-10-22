import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

export interface HeroStat { value: string; label: string }
interface Cta { label: string; to: string }

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  stats?: HeroStat[];
  icon?: LucideIcon;
  highlights?: string[];
}

/** Shared page header matching the 2026 home page: badge, big headline, CTAs, side panel. */
const PageHero = ({ eyebrow, title, description, primaryCta, secondaryCta, stats, icon: Icon, highlights }: PageHeroProps) => (
  <section className="relative overflow-hidden bg-background pt-12 pb-16 md:pt-20 md:pb-24">
    <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-accent/10 blur-3xl" />
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-7 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wide text-foreground">{eyebrow}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {primaryCta && (
                primaryCta.to.startsWith('#') ? (
                  <button
                    type="button"
                    onClick={() => scrollToId(primaryCta.to.slice(1))}
                    className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent/90"
                  >
                    {primaryCta.label} <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <Link to={primaryCta.to} className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent/90">
                    {primaryCta.label} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                )
              )}
              {secondaryCta && (
                secondaryCta.to.startsWith('#') ? (
                  <button
                    type="button"
                    onClick={() => scrollToId(secondaryCta.to.slice(1))}
                    className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-3.5 font-bold text-foreground transition-all hover:border-accent hover:text-accent"
                  >
                    {secondaryCta.label}
                  </button>
                ) : (
                  <Link to={secondaryCta.to} className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-3.5 font-bold text-foreground transition-all hover:border-accent hover:text-accent">
                    {secondaryCta.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>

        {(stats || highlights) && (
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl">
            {Icon && (
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                <Icon className="h-6 w-6 text-accent" />
              </div>
            )}
            {stats && (
              <div className="grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-3xl font-bold text-accent">{s.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            {highlights && (
              <ul className={`space-y-3 ${stats ? 'mt-6 border-t border-border pt-6' : ''}`}>
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
