
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="my-16 bg-cc-navy text-white p-12 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Investment Strategy?</h2>
      <p className="max-w-2xl mx-auto mb-8">
        Our team of expert advisors is ready to help you achieve your financial goals with tailored investment solutions.
      </p>
      <Button className="bg-cc-gold hover:bg-yellow-600 text-cc-navy font-bold text-lg px-8 py-6">
        <Link to="/contact" className="flex items-center">
          Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default CTASection;
