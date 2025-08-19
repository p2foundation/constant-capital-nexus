
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileNavigation = ({ isMenuOpen, toggleMenu }: MobileNavigationProps) => {
  if (!isMenuOpen) return null;
  
  return (
    <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in dark:bg-cc-navy/95 dark:border-gray-800 max-h-[85vh] overflow-y-auto">
      <div className="px-3 pt-3 pb-4 space-y-0.5">
        <Link
          to="/"
          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
          onClick={toggleMenu}
        >
          Home
        </Link>
        
        {/* Services Section */}
        <div className="pt-4 pb-2 px-4 text-sm font-semibold text-cc-gold uppercase tracking-wider">Services</div>
        <div className="grid grid-cols-1 gap-0.5">
          <Link
            to="/securities-trading"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Securities Trading
          </Link>
          <Link
            to="/investment-research"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Investment Research
          </Link>
          <Link
            to="/financings-capital-markets"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Capital Markets
          </Link>
          <Link
            to="/investment-advisory"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Investment Advisory
          </Link>
          <Link
            to="/strategic-advisory"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Strategic Advisory
          </Link>
          <Link
            to="/private-equity"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Private Equity
          </Link>
        </div>
        
        {/* Research Hub Section */}
        <div className="pt-4 pb-2 px-4 text-sm font-semibold text-cc-gold uppercase tracking-wider">Research Hub</div>
        <div className="grid grid-cols-1 gap-0.5">
          <Link
            to="/research"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Daily Reports
          </Link>
          <a
            href="https://research.constantcap.com.gh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Research Portal
          </a>
        </div>
        
        {/* Calculators Section */}
        <div className="pt-4 pb-2 px-4 text-sm font-semibold text-cc-gold uppercase tracking-wider">Calculators</div>
        <div className="grid grid-cols-1 gap-0.5">
          <Link
            to="/t-bill-calculator"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            T-Bill Calculator
          </Link>
          <Link
            to="/equity-calculator"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Equity Calculator
          </Link>
        </div>
        
        {/* About Section */}
        <div className="pt-4 pb-2 px-4 text-sm font-semibold text-cc-gold uppercase tracking-wider">About Us</div>
        <div className="grid grid-cols-1 gap-0.5">
          <Link
            to="/about"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Company
          </Link>
          <Link
            to="/leadership"
            className="flex items-center px-5 py-3 rounded-lg text-sm font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Leadership
          </Link>
        </div>
        
        {/* Other Links */}
        <div className="pt-4 space-y-0.5">
          <Link
            to="/faqs"
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            FAQs
          </Link>
          <Link
            to="/contact"
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 transition-colors min-h-[44px]"
            onClick={toggleMenu}
          >
            Log In
          </Link>
          <Link
            to="/account-opening"
            className="flex items-center justify-center px-4 py-3 rounded-lg text-base font-bold bg-cc-navy text-white hover:bg-cc-blue dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80 transition-colors min-h-[48px] mt-3"
            onClick={toggleMenu}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
