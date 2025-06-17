
import React from 'react';
import { Button } from "@/components/ui/button";

interface SuggestedQuestion {
  text: string;
  keywords: string[];
}

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const suggestedQuestions: SuggestedQuestion[] = [
  {
    text: "What services does Constant Capital offer?",
    keywords: ["services", "what", "do", "offer", "company"]
  },
  {
    text: "How do I open an investment account?",
    keywords: ["account", "open", "register", "start", "investing"]
  },
  {
    text: "What are your trading fees and commissions?",
    keywords: ["fees", "cost", "commission", "charges", "pricing"]
  },
  {
    text: "Tell me about your investment research services",
    keywords: ["research", "analysis", "reports", "insights"]
  },
  {
    text: "How can I contact Constant Capital?",
    keywords: ["contact", "phone", "email", "office", "reach"]
  },
  {
    text: "What is your private equity offering?",
    keywords: ["private", "equity", "alternative", "investments"]
  },
  {
    text: "Do you provide strategic advisory services?",
    keywords: ["advisory", "strategic", "consulting", "guidance"]
  },
  {
    text: "What markets do you trade on?",
    keywords: ["markets", "gse", "trading", "stocks", "securities"]
  }
];

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onQuestionClick }) => {
  // Get 3 random questions
  const getRandomQuestions = () => {
    const shuffled = [...suggestedQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const randomQuestions = getRandomQuestions();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
      <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
        Here are some questions I can help you with:
      </p>
      <div className="space-y-2">
        {randomQuestions.map((question, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onQuestionClick(question.text)}
            className="w-full text-left justify-start h-auto p-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            {question.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
