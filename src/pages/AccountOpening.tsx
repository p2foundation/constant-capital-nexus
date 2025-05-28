
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AccountOpeningForm from '@/components/account-opening/AccountOpeningForm';

const AccountOpening = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm py-4 dark:bg-cc-navy/90 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-cc-navy dark:text-white">
              Constant<span className="text-cc-gold">Capital</span>
            </span>
          </Link>
          <Link to="/" className="text-cc-navy hover:text-cc-blue flex items-center dark:text-white dark:hover:text-cc-gold">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Main Content with top padding to account for fixed header */}
      <div className="flex-1 py-8 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 dark:bg-cc-navy dark:border-gray-800">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-cc-navy dark:text-white mb-2">
                  Open Your Investment Account
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete your CSD account opening and KYC process online
                </p>
              </div>
              
              <AccountOpeningForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-white border-t border-gray-100 py-4 text-center text-sm text-gray-500 dark:bg-cc-navy/90 dark:border-gray-800 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Constant Capital (Ghana) Limited
      </div>
    </div>
  );
};

export default AccountOpening;
