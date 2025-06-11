
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageGenerator from '@/components/ImageGenerator';

interface StrategicPartnershipSectionProps {
  strategicAdvisoryImage: string;
  onImageGenerated: (imageUrl: string) => void;
}

const StrategicPartnershipSection = ({ strategicAdvisoryImage, onImageGenerated }: StrategicPartnershipSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-cc-navy dark:text-white">Strategic Partnership</h2>
        <p className="mb-6 dark:text-gray-300">
          Our Strategic Advisory practice partners with businesses to navigate complex strategic decisions that reshape their future. From mergers and acquisitions to corporate restructuring and business transformation, we provide the expertise and guidance needed to achieve optimal outcomes.
        </p>
        <p className="mb-8 dark:text-gray-300">
          With deep industry knowledge and extensive transaction experience across Ghana and broader African markets, our advisory team works closely with clients to develop and execute strategies that create sustainable value and competitive advantage.
        </p>
        <Button className="bg-cc-navy hover:bg-blue-900 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80">
          <Link to="/contact" className="flex items-center">
            Discuss Your Strategic Needs <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg dark:bg-gray-800">
        <img 
          src={strategicAdvisoryImage} 
          alt="Strategic Advisory" 
          className="rounded-lg shadow-lg"
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
