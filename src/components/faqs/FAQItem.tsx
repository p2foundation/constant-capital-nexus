
import React from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

const FAQItem = ({ question, answer, value }: FAQItemProps) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-left text-cc-navy dark:text-white hover:text-cc-blue dark:hover:text-cc-gold">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
