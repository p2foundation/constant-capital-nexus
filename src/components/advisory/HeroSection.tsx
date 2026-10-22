import React from 'react';
import { LineChart } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const HeroSection = () => (
  <PageHero
    eyebrow="SEC Licensed Investment Advisor"
    title={<>Investment <span className="text-accent">Advisory</span></>}
    description="Tailored investment strategies to help you reach your financial goals with confidence and clarity."
    primaryCta={{ label: 'Speak to an Advisor', to: '/contact' }}
    secondaryCta={{ label: 'Explore Research', to: '/research' }}
    icon={LineChart}
    highlights={[
      'Portfolio construction and review',
      'Fixed income and equity strategies',
      'Risk-aligned, goal-based planning',
      'For institutions and individuals',
    ]}
  />
);

export default HeroSection;
