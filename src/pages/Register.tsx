
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white/90 backdrop-blur-sm fixed w-full z-50 border-b border-gray-100 shadow-sm py-4 dark:bg-cc-navy/90 dark:border-gray-800">
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
      
      <div className="flex-1 flex items-center justify-center bg-cc-gray py-12 px-4 pt-28 dark:bg-cc-navy/50">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-8 border border-gray-100 dark:bg-cc-navy dark:border-gray-800">
          <RegisterForm />
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-100 py-4 text-center text-sm text-gray-500 dark:bg-cc-navy/90 dark:border-gray-800 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Constant Capital (Ghana) Limited
      </div>
    </div>
  );
};

export default Register;
