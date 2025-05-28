
import React from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading market data..." }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-navy/95">
      <Navbar />
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-cc-navy dark:text-cc-gold" />
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">{message}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoadingState;
