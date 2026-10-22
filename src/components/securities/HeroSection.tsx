import React from 'react';
import { ChartLine } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const HeroSection = () => (
  <PageHero
    eyebrow="GSE Licensed Dealing Member"
    title={<>Securities <span className="text-accent">Trading</span></>}
    description="Access the Ghana Stock Exchange and wider African markets with expert execution, transparent pricing and research-backed guidance."
    primaryCta={{ label: 'Open Account', to: '/account-opening' }}
    secondaryCta={{ label: 'View Market Report', to: '/full-market-report' }}
    icon={ChartLine}
    highlights={[
      'Equities, bonds and Treasury bills',
      'Licensed CSD depository participant',
      'Institutional and individual investors',
      'Daily market research and insights',
    ]}
  />
);

export default HeroSection;
