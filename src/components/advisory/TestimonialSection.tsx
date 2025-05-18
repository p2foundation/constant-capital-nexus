
import React from 'react';

const TestimonialSection = () => {
  return (
    <div className="my-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-cc-gold dark:bg-gray-800 dark:border-cc-gold">
        <div className="flex flex-col items-center text-center">
          <blockquote className="italic text-lg mb-6 dark:text-gray-300">
            "The investment advisory team at Constant Capital has been instrumental in helping us navigate complex markets. Their strategic guidance and personalized approach have consistently delivered results that exceed our expectations."
          </blockquote>
          <div className="font-medium text-cc-navy dark:text-cc-gold">
            — Chief Investment Officer, Leading Pension Fund
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
