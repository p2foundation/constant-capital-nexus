import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Briefcase, Award, UserRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

interface Leader {
  id: string;
  name: string;
  title: string;
  imageSrc: string;
  bio: string;
  education?: string;
  experience?: string[];
  achievements?: string[];
}

interface LeaderModalProps {
  leader: Leader;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalLeaders: number;
}

const LeaderModal: React.FC<LeaderModalProps> = ({
  leader, isOpen, onClose, onNext, onPrev, currentIndex, totalLeaders,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('bio');

  const sections = [
    { id: 'bio', label: 'Biography', icon: UserRound, show: true },
    { id: 'education', label: 'Education', icon: GraduationCap, show: !!leader.education },
    { id: 'experience', label: 'Experience', icon: Briefcase, show: !!leader.experience?.length },
    { id: 'achievements', label: 'Achievements', icon: Award, show: !!leader.achievements?.length },
  ].filter((s) => s.show);

  // Reset on leader change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setProgress(0);
    setActive('bio');
  }, [leader.id]);

  // Keyboard prev/next
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onNext, onPrev]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 1);
    let current = sections[0]?.id;
    sections.forEach((s) => {
      const node = el.querySelector<HTMLElement>(`[data-section="${s.id}"]`);
      if (node && node.offsetTop - el.scrollTop < 160) current = s.id;
    });
    if (max - el.scrollTop < 4) current = sections[sections.length - 1]?.id;
    if (current) setActive(current);
  };

  const jump = (id: string) => {
    const el = scrollRef.current;
    const node = el?.querySelector<HTMLElement>(`[data-section="${id}"]`);
    if (el && node) el.scrollTo({ top: node.offsetTop - 120, behavior: 'smooth' });
  };

  const paragraphs = leader.bio.split('\n\n').filter(Boolean);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[92vh] max-w-6xl gap-0 overflow-hidden border-border p-0 sm:rounded-2xl">
        <div className="grid h-[92vh] min-h-0 grid-rows-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Sticky portrait (desktop) */}
          <aside className="hidden flex-col justify-between overflow-hidden border-r border-border bg-muted/40 p-8 md:flex">
            <div key={leader.id} className="animate-in fade-in zoom-in-95 duration-500">
              <div className="relative mx-auto aspect-[4/5] max-h-[52vh] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border">
                <img src={leader.imageSrc} alt={leader.name} className="h-full w-full object-cover object-top" />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-wider text-primary-foreground">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(totalLeaders).padStart(2, '0')}
                </span>
              </div>
              <h2 className="mt-6 font-heading text-2xl font-bold leading-tight text-foreground lg:text-3xl">{leader.name}</h2>
              <p className="mt-1 font-medium text-primary">{leader.title}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <Button size="icon" variant="outline" onClick={onPrev} aria-label="Previous leader"><ChevronLeft className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" onClick={onNext} aria-label="Next leader"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </aside>

          {/* Scrolling record */}
          <div ref={scrollRef} onScroll={onScroll} className="relative h-full min-h-0 overflow-y-auto scroll-smooth">
            {/* Mobile portrait */}
            <div className="relative h-80 md:hidden">
              <img src={leader.imageSrc} alt={leader.name} className="h-full w-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Sticky bar: identity + section nav + progress */}
            <div className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-md">
              <div className="flex items-center gap-3 px-6 pt-4 pr-14">
                <img src={leader.imageSrc} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-primary" />
                <div className="min-w-0">
                  <DialogTitle className="truncate font-heading text-base font-semibold text-foreground">{leader.name}</DialogTitle>
                  <DialogDescription className="truncate text-xs text-muted-foreground">{leader.title}</DialogDescription>
                </div>
              </div>
              <nav className="flex gap-1 overflow-x-auto px-5 py-3">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => jump(id)}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                      active === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />{label}
                  </button>
                ))}
              </nav>
              <div className="h-0.5 bg-border">
                <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>

            <div key={leader.id} className="animate-in fade-in slide-in-from-bottom-4 space-y-12 px-6 py-10 duration-500 md:px-10">
              <section data-section="bio">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Biography</p>
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={cn(
                      'mt-4 leading-relaxed text-muted-foreground',
                      i === 0 && 'text-lg font-medium leading-relaxed text-foreground',
                    )}
                  >
                    {p}
                  </p>
                ))}
              </section>

              {leader.education && (
                <section data-section="education">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Education</p>
                  <div className="mt-4 flex gap-4 rounded-xl border border-border bg-muted/40 p-5">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="leading-relaxed text-foreground">{leader.education}</p>
                  </div>
                </section>
              )}

              {!!leader.experience?.length && (
                <section data-section="experience">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Professional experience</p>
                  <ol className="relative mt-6 space-y-6 border-l border-border pl-6">
                    {leader.experience.map((exp, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
                        <p className="leading-relaxed text-foreground">{exp}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {!!leader.achievements?.length && (
                <section data-section="achievements">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Key achievements</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {leader.achievements.map((a, i) => (
                      <div key={i} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
                        <span className="font-heading text-2xl font-bold text-primary/70">{String(i + 1).padStart(2, '0')}</span>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">{a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
                <Button variant="outline" onClick={onPrev}><ChevronLeft className="mr-1 h-4 w-4" />Previous</Button>
                <span className="text-xs text-muted-foreground">Use ← → keys to browse</span>
                <Button onClick={onNext}>Next<ChevronRight className="ml-1 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderModal;
