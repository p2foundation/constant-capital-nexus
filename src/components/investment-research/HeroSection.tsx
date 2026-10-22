import React from 'react';
import { LineChart } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const HeroSection = () => (
  <PageHero
    eyebrow="Market Intelligence"
    title={<>Investment <span className="text-accent">Research</span></>}
    description="Comprehensive market intelligence and analysis to guide your investment decisions across Ghana and African markets."
    primaryCta={{ label: 'Access Research Reports', to: '/research' }}
    secondaryCta={{ label: 'Schedule Consultation', to: '/contact' }}
    icon={LineChart}
    highlights={[
      'Equity and fixed income coverage',
      'Daily and weekly market reports',
      'Macroeconomic outlooks',
      'Backed by deep local market knowledge',
    ]}
  />
);

export default HeroSection;
