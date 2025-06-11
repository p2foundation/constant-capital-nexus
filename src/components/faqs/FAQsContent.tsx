
import React from 'react';
import FAQCategory from './FAQCategory';
import ContactCTA from './ContactCTA';
import { faqCategories } from './faqData';

const FAQsContent = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-cc-navy dark:text-white">Common Questions</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Browse through our frequently asked questions organized by category
        </p>
      </div>

      <div className="space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <FAQCategory
            key={categoryIndex}
            title={category.title}
            icon={category.icon}
            questions={category.questions}
            categoryIndex={categoryIndex}
          />
        ))}
      </div>

      <ContactCTA />
    </div>
  );
};

export default FAQsContent;
