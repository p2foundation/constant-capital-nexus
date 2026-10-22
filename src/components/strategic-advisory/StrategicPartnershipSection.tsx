import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageGenerator from '@/components/ImageGenerator';

interface StrategicPartnershipSectionProps {
  strategicAdvisoryImage: string;
  onImageGenerated: (imageUrl: string) => void;
}

const StrategicPartnershipSection = ({ strategicAdvisoryImage, onImageGenerated }: StrategicPartnershipSectionProps) => {
  return (
    <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Our approach</p>
        <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Strategic Partnership</h2>
        <div className="mb-6 h-1.5 w-20 bg-accent" />
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Our Strategic Advisory practice partners with businesses to navigate complex strategic decisions that reshape their future. From mergers and acquisitions to corporate restructuring and business transformation, we provide the expertise and guidance needed to achieve optimal outcomes.
        </p>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          With deep industry knowledge and extensive transaction experience across Ghana and broader African markets, our advisory team works closely with clients to develop and execute strategies that create sustainable value and competitive advantage.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 font-bold text-accent-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-accent/90"
        >
          Discuss Your Strategic Needs <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
        <img
          src={strategicAdvisoryImage}
          alt="Strategic Advisory"
          className="rounded-xl shadow-lg"
        />
        <div className="mt-4 flex justify-center">
          <ImageGenerator
            onImageGenerated={onImageGenerated}
            buttonText="Generate New Strategic Advisory Image"
            imageType="strategic-advisory"
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default StrategicPartnershipSection;
