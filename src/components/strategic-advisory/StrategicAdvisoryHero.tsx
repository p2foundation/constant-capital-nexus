
import React from 'react';
import { Handshake } from 'lucide-react';

const StrategicAdvisoryHero = () => {
  return (
    <div className="bg-cc-navy text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Strategic Advisory</h1>
          <p className="text-lg md:text-xl mb-8">
            Expert guidance on mergers, acquisitions, corporate restructuring, and strategic business initiatives.
          </p>
          <div className="flex items-center">
            <Handshake className="h-6 w-6 mr-2 text-cc-gold" />
            <p className="font-medium">Trusted advisors for transformational business decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicAdvisoryHero;
