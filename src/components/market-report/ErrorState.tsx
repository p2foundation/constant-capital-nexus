
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-navy/95">
      <Navbar />
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-red-500 text-xl">Error loading market data</div>
          <p className="mt-4">{error.message}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorState;
