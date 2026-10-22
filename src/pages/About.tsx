import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import PageHero from '@/components/layout/PageHero';
import { ArrowRight, Award, Building2, Handshake, Globe, Lightbulb, Target, ShieldCheck, Landmark, Database } from 'lucide-react';

const values = [
  { icon: Award, title: 'Excellence', text: 'Exceptional results and the highest standards in everything we do.' },
  { icon: Handshake, title: 'Integrity', text: 'Transparency and honesty in every interaction.' },
  { icon: Lightbulb, title: 'Innovation', text: 'New and better solutions for evolving client and market needs.' },
  { icon: Globe, title: 'Client Focus', text: 'Long-term relationships built on trust and shared success.' },
];

const licences = [
  { icon: ShieldCheck, title: 'SEC Ghana', text: 'Licensed broker-dealer and investment advisor.' },
  { icon: Landmark, title: 'Ghana Stock Exchange', text: 'Licensed dealing member of the GSE.' },
  { icon: Database, title: 'Central Securities Depository', text: 'Registered depository participant (DP).' },
];

const About = () => {
  useAnalytics();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <PageHero
          eyebrow="About Constant Capital"
          title={<>Connecting African <span className="text-accent">opportunity</span> with global capital</>}
          description="Constant Capital (Ghana) Limited is a registered broker-dealer and investment advisor, delivering a full range of innovative, customised financial solutions to global standards for local and international clients."
          primaryCta={{ label: 'Meet Our Team', to: '/leadership' }}
          secondaryCta={{ label: 'Contact Us', to: '/contact' }}
          icon={Building2}
          highlights={licences.map((l) => `${l.title} — ${l.text}`)}
        />

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-accent/10 blur-2xl" />
              <img
                src="/lovable-uploads/3722b840-57e0-4fc4-8378-9ee194fd4491.png"
                alt="Constant Capital office"
                loading="lazy"
                className="relative w-full rounded-2xl border border-border object-cover shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Our story</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                A gateway to African markets for global investors
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Founded in Ghana, Constant Capital has grown into a trusted gateway for international investment in West Africa.
                Deep local market knowledge, global expertise and international partnerships let us connect local opportunities
                with international capital, creating lasting value across borders.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                We serve clients worldwide seeking exposure to African markets, as well as local institutions and individuals —
                always putting their interests first, whatever their location or size.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">What guides us</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our core values</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ icon: Icon, title, text }) => (
                <div key={title} className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 transition-colors group-hover:bg-accent">
                    <Icon className="h-6 w-6 text-accent transition-colors group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            {[
              { icon: Target, title: 'Our Vision', text: 'To be the premier investment bank in Africa, known for excellence in financial services and for connecting African opportunities with global capital, setting the standard for innovation and integrity.' },
              { icon: Building2, title: 'Our Mission', text: 'To provide innovative financial solutions that create lasting value for our clients, with the highest standards of integrity and professionalism, contributing to the growth of African capital markets.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
                <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                <Icon className="mb-5 h-8 w-8 text-accent" />
                <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">{title}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-accent p-8 md:flex-row md:items-center md:p-12">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-accent-foreground">Ready to grow your wealth?</h2>
                <p className="mt-2 text-accent-foreground/80">Talk to our team about trading, research or strategic advice.</p>
              </div>
              <Link to="/contact" className="inline-flex shrink-0 items-center rounded-xl bg-background px-7 py-3.5 font-bold text-foreground transition-transform hover:-translate-y-0.5">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
