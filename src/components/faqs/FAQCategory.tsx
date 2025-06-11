
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Accordion } from "@/components/ui/accordion";
import FAQItem from './FAQItem';

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQCategoryProps {
  title: string;
  icon: LucideIcon;
  questions: FAQQuestion[];
  categoryIndex: number;
}

const FAQCategory = ({ title, icon: Icon, questions, categoryIndex }: FAQCategoryProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Icon className="h-6 w-6 text-cc-gold mr-3" />
        <h3 className="text-xl font-bold text-cc-navy dark:text-white">{title}</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {questions.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            value={`${categoryIndex}-${index}`}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default FAQCategory;
