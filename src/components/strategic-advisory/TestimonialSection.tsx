
import React from 'react';

const TestimonialSection = () => {
  return (
    <div className="my-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-cc-gold dark:bg-gray-700 dark:border-cc-gold">
        <div className="flex flex-col items-center text-center">
          <blockquote className="italic text-lg mb-6 dark:text-white">
            "The strategic advisory team at Constant Capital provided invaluable guidance during our company's transformational acquisition. Their deep industry knowledge and transaction expertise were instrumental in navigating a complex process and ensuring a successful outcome."
          </blockquote>
          <div className="font-medium text-cc-navy dark:text-cc-gold">
            — CEO, Leading Ghanaian Manufacturing Company
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
