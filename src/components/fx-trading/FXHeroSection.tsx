import React from 'react';
import { Globe } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const FXHeroSection = () => (
  <PageHero
    eyebrow="SEC & BoG Licensed FX Dealer"
    title={<>Foreign exchange, <span className="text-accent">done right.</span></>}
    description="Access competitive exchange rates and institutional-grade FX services. From spot transactions to hedging solutions, we deliver precision and reliability."
    primaryCta={{ label: 'Start Trading', to: '/contact' }}
    secondaryCta={{ label: 'Open FX Account', to: '/account-opening' }}
    icon={Globe}
    stats={[{ value: '15+', label: 'Currency pairs' }, { value: '24/5', label: 'Trading hours' }]}
    highlights={['Spot and forward transactions', 'Hedging solutions for businesses', 'Competitive, transparent pricing']}
  />
);

export default FXHeroSection;
