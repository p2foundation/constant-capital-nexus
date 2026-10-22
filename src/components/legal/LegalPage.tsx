import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggler from '@/components/ThemeToggler';

interface LegalPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const LegalPage = ({ title, description, children }: LegalPageProps) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Helmet>
      <title>{title} | Constant Capital</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
    </Helmet>
    <Navbar />
    <div className="fixed bottom-6 right-6 z-40"><ThemeToggler /></div>
    <main className="flex-1 pt-16">
      <header className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
          <p className="mb-3 text-sm font-semibold uppercase text-accent">Legal &amp; compliance</p>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Effective date: 5 October 2026</p>
        </div>
      </header>
      <article className="prose prose-lg mx-auto max-w-4xl px-6 py-12 prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-accent dark:prose-invert">
        {children}
      </article>
    </main>
    <Footer />
  </div>
);

export default LegalPage;