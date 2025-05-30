import React from 'react';
import {Link} from 'react-router-dom';

interface MobileNavigationProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const MobileNavigation = ({isMenuOpen, toggleMenu}: MobileNavigationProps) => {
    if (!isMenuOpen) return null;

    return (
        <div
            className="md:hidden bg-white border-t border-gray-100 animate-fade-in dark:bg-cc-navy/95 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                    to="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80"
                    onClick={toggleMenu}
                >
                    Home
                </Link>
                {/* About Section */}
                <div className="py-2 px-3 font-medium text-cc-navy dark:text-white">About Us:</div>
                <Link
                    to="/about"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Company
                </Link>
                <Link
                    to="/leadership"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Leadership
                </Link>

                {/* Services Section */}
                <div className="py-2 px-3 font-medium text-cc-navy dark:text-white">Services:</div>
                <Link
                    to="/securities-trading"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Securities Trading
                </Link>
                <Link
                    to="/financings-capital-markets"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Financings & Capital Markets
                </Link>
                <Link
                    to="/research-services"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Research Services
                </Link>
                <Link
                    to="/investment-advisory"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Investment Advisory
                </Link>
                <Link
                    to="/strategic-advisory"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Strategic Advisory
                </Link>
                <Link
                    to="/private-equity"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Private Equity
                </Link>

                <Link
                    to="/research"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80"
                    onClick={toggleMenu}
                >
                    Research
                </Link>

                {/* Calculators Section */}
                <div className="py-2 px-3 font-medium text-cc-navy dark:text-white">Calculators:</div>
                <Link
                    to="/t-bill-calculator"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    T-Bill Calculator
                </Link>
                <Link
                    to="/equity-calculator"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80 ml-4"
                    onClick={toggleMenu}
                >
                    Equity Calculator
                </Link>


                <Link
                    to="/contact"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80"
                    onClick={toggleMenu}
                >
                    Contact Us
                </Link>
                <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-cc-navy hover:bg-cc-light-blue dark:text-white dark:hover:bg-cc-navy/80"
                    onClick={toggleMenu}
                >
                    Log In
                </Link>
                <Link
                    to="#"
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-cc-navy text-white hover:bg-cc-blue dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/80"
                    onClick={toggleMenu}
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default MobileNavigation;
