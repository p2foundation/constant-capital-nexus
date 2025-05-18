
import React from 'react';

const TestimonialSection = () => {
  return (
    <div className="mt-16 bg-cc-navy/5 p-8 rounded-lg dark:bg-gray-800/50">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-medium mb-4 text-cc-navy dark:text-white">Client Testimonial</h3>
        <blockquote className="italic text-lg mb-4 dark:text-gray-300">
          "Constant Capital's trading team consistently delivers excellent execution and valuable market insights. Their knowledge of African markets has been instrumental to our investment success."
        </blockquote>
        <div className="font-medium dark:text-gray-300">
          — Investment Director, Leading Pension Fund
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
