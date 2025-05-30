import React from "react";
import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cc-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            {/* <div className="text-2xl font-serif font-bold mb-6">
              Constant<span className="text-cc-gold">Capital</span>
            </div> */}
            <div className="mb-6">
              {/* Use the orange logo for footer since it's always on dark background */}
              <img
                src="/lovable-uploads/c05b6b3d-673c-43cd-92c1-ce160b898d22.png"
                alt="Constant Capital"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Constant Capital (Ghana) Limited is a licensed broker-dealer
              regulated by the Securities and Exchange Commission of Ghana.
            </p>
            <div className="flex items-center">
              <div className="text-sm text-gray-300 mr-4">
                SEC License: <span className="text-white">SD-001/15</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-cc-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-cc-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/securities-trading"
                  className="hover:text-cc-gold transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/research"
                  className="hover:text-cc-gold transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-cc-gold transition-colors"
                >
                  Research Team Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  to="/securities-trading"
                  className="hover:text-cc-gold transition-colors"
                >
                  Equities Trading
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-cc-gold transition-colors">
                  Fixed Income
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-cc-gold transition-colors">
                  Eurobonds
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-cc-gold transition-colors">
                  SSA Bonds
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-cc-gold transition-colors">
                  Wealth Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>6 Tanbu Lane, East Legon, Accra, Ghana</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <a
                  href="tel:+233302738242"
                  className="hover:text-cc-gold transition-colors duration-300"
                >
                  +233 302 738 242
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:info@constantcapital.com.gh?subject=Inquiry from Website"
                  className="hover:text-cc-gold transition-colors duration-300"
                >
                  info@constantcapital.com.gh
                </a>
              </li>
            </ul>

            {/*Social Media Links*/}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://web.facebook.com/people/Constant-Capital-Ghana-Ltd/100077083761348/"
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-cc-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://gh.linkedin.com/company/constant-capital-ghana-ltd"
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-cc-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-cc-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Constant Capital (Ghana) Limited.
            All rights reserved.
          </div>

          <div className="flex space-x-6 text-sm text-gray-400">
            <Link
              to="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie-policy"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
