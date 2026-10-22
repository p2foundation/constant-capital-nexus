import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, GraduationCap, Sparkles, Quote } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeaderModal from '@/components/leadership/LeaderModal';
import { leaders } from '@/data/leaders';
import { useAnalytics } from '@/hooks/useAnalytics';

const Leadership = () => {
  useAnalytics();
  const [active, setActive] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const leader = leaders[active];
  const next = () => setActive((i) => (i + 1) % leaders.length);
  const prev = () => setActive((i) => (i === 0 ? leaders.length - 1 : i - 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalIndex !== null) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalIndex]);

  const firstParagraph = leader.bio.split('\n\n')[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Editorial hero */}
        <section className="relative overflow-hidden pt-14 pb-10 md:pt-20">
          <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Leadership &amp; Governance</p>
            <h1 className="max-w-5xl font-heading text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-8xl">
              The people behind <span className="text-accent">the capital.</span>
            </h1>
            <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                A board that has structured deals on Wall Street, advised on Ghana's landmark energy and infrastructure
                financings, and built Africa-focused capital markets firms.
              </p>
              <div className="flex -space-x-3">
                {leaders.map((l, i) => (
                  <button
                    key={l.id}
                    onClick={() => { setActive(i); document.getElementById('spotlight')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="h-14 w-14 overflow-hidden rounded-full border-2 border-background ring-2 ring-transparent transition-all hover:z-10 hover:-translate-y-1 hover:ring-accent"
                    aria-label={`View ${l.name}`}
                  >
                    <img src={l.imageSrc} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive spotlight */}
        <section id="spotlight" className="scroll-mt-20 py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[330px_1fr]">
              {/* Roster */}
              <nav aria-label="Board members" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
                {leaders.map((l, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setActive(i)}
                      aria-current={on}
                      className={`group flex shrink-0 items-center gap-3 rounded-xl border p-3 text-left transition-all ${on ? 'border-accent bg-card shadow-lg' : 'border-transparent hover:border-border hover:bg-card/60'}`}
                    >
                      <span className={`font-heading text-sm font-bold ${on ? 'text-accent' : 'text-muted-foreground'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <img src={l.imageSrc} alt="" className={`h-11 w-11 rounded-lg object-cover transition-all ${on ? '' : 'grayscale group-hover:grayscale-0'}`} />
                      <span className="min-w-0">
                        <span className="block truncate font-heading font-semibold text-foreground">{l.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{l.title}</span>
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Profile */}
              <article key={leader.id} className="grid animate-fade-in overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[360px] bg-muted">
                  <img src={leader.imageSrc} alt={leader.name} className="absolute inset-0 h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card/30" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    {leader.title}
                  </div>
                </div>
                <div className="flex flex-col p-6 sm:p-10">
                  <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{leader.name}</h2>
                  {leader.education && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {leader.education.split(';').map((e) => (
                        <span key={e} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                          <GraduationCap className="h-3.5 w-3.5 text-accent" /> {e.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-6 line-clamp-6 leading-relaxed text-muted-foreground">{firstParagraph}</p>
                  {leader.achievements && leader.achievements.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {leader.achievements.slice(0, 3).map((a) => (
                        <li key={a} className="flex gap-3 text-sm text-foreground">
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                    <button onClick={() => setModalIndex(active)} className="inline-flex items-center rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent/90">
                      Read full profile <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="mr-2 text-sm text-muted-foreground">{active + 1} / {leaders.length}</span>
                      <button onClick={prev} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"><ArrowLeft className="h-4 w-4" /></button>
                      <button onClick={next} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"><ArrowRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Board wall */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">The full board</h2>
              <span className="hidden text-sm text-muted-foreground sm:block">Tap a portrait for the full profile</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {leaders.map((l, i) => (
                <button key={l.id} onClick={() => setModalIndex(i)} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border text-left">
                  <img src={l.imageSrc} alt={l.name} loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mb-2 h-0.5 w-8 bg-accent transition-all duration-300 group-hover:w-16" />
                    <div className="font-heading font-bold leading-tight text-foreground">{l.name}</div>
                    <div className="text-xs text-accent">{l.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Quote + vision */}
        <section className="pb-20">
          <div className="container mx-auto grid gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
              <Quote className="mb-6 h-10 w-10 text-accent" />
              <p className="font-heading text-2xl leading-snug text-foreground md:text-3xl">
                Good business leaders create a vision, articulate the vision, passionately own the vision and relentlessly drive it to completion.
              </p>
              <p className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">Jack Welch</p>
            </div>
            <div className="flex flex-col justify-between rounded-3xl bg-accent p-8 md:p-12">
              <div>
                <h2 className="font-heading text-2xl font-bold text-accent-foreground md:text-3xl">Governed for the long term</h2>
                <p className="mt-4 leading-relaxed text-accent-foreground/80">
                  Our board brings decades of experience in investment banking, law, asset management and advisory —
                  guiding Constant Capital with transparency, integrity and a focus on sustainable growth.
                </p>
              </div>
              <Link to="/contact" className="mt-8 inline-flex w-fit items-center rounded-xl bg-background px-6 py-3 font-bold text-foreground transition-transform hover:-translate-y-0.5">
                Talk to our team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {modalIndex !== null && (
        <LeaderModal
          leader={leaders[modalIndex]}
          isOpen
          onClose={() => setModalIndex(null)}
          onNext={() => setModalIndex((modalIndex + 1) % leaders.length)}
          onPrev={() => setModalIndex(modalIndex === 0 ? leaders.length - 1 : modalIndex - 1)}
          currentIndex={modalIndex}
          totalLeaders={leaders.length}
        />
      )}
      <Footer />
    </div>
  );
};

export default Leadership;
