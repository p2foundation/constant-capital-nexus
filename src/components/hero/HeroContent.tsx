
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroContent = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "Constant Capital is a full-service securities firm offering a broad range of investment banking services to private and public clients.",
    "Our professionals deliver the experience and insights required to access investment markets, raise capital, and mitigate risk.",
    "We work closely with our clients to develop innovative solutions that effectively meet their financing, investment, and strategic priorities.",
    "We strive to be a long-term trusted adviser and financier to our clients."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // Change message every 4 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cc-navy dark:text-white leading-tight mb-6">
        Ghana's Premier <span className="text-gradient">Investment</span> Brokerage
      </h1>

      {/* Flashing/rotating messages */}
      <div className="mb-8 min-h-[4rem] flex items-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 transition-opacity duration-500 ease-in-out">
          {messages[currentMessageIndex]}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-cc-navy hover:bg-cc-blue text-white dark:bg-cc-gold dark:hover:bg-cc-gold/90 px-6 py-6 rounded-md flex items-center justify-center">
          <Link to="/register">
            Open an Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="border-cc-blue text-cc-blue dark:border-cc-gold dark:text-cc-gold hover:bg-cc-light-blue dark:hover:bg-cc-navy/50 px-6 py-6 rounded-md">
          <Link to="/about">Learn More</Link>
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">Global</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Expertise</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">100%</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Client Focus</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">₵2B+</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Equities Traded</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-cc-navy dark:text-white">SEC</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Regulated</div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
