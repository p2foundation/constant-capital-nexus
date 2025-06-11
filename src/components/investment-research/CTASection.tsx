
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">Access Premium Research</h2>
      <p className="max-w-2xl mx-auto mb-8">
        Get exclusive access to our institutional-quality research reports, 
        market insights, and investment recommendations.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold text-lg px-8 py-6">
          <Link to="/research" className="flex items-center">
            Browse Research Reports <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button variant="outline" className="border-white text-cc-navy bg-white hover:bg-gray-100 font-bold text-lg px-8 py-6">
          <Link to="/contact" className="flex items-center">
            Request Custom Research <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
