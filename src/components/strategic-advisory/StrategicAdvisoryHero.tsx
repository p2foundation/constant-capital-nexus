import React from 'react';
import { Handshake } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const StrategicAdvisoryHero = () => (
  <PageHero
    eyebrow="Corporate Finance"
    title={<>Strategic <span className="text-accent">Advisory</span></>}
    description="Expert guidance on mergers, acquisitions, corporate restructuring and the decisions that transform a business."
    primaryCta={{ label: 'Book a Consultation', to: '/contact' }}
    secondaryCta={{ label: 'Meet the Team', to: '/leadership' }}
    icon={Handshake}
    highlights={[
      'Mergers and acquisitions',
      'Capital raising and restructuring',
      'Valuations and due diligence',
      'Market entry for global investors',
    ]}
  />
);

export default StrategicAdvisoryHero;
