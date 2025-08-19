
import React, { useState } from 'react';
import NavLogo from './navigation/NavLogo';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';
import AuthButtons from './navigation/AuthButtons';
import MobileMenuButton from './navigation/MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-50 border-b border-gray-100 shadow-sm dark:bg-cc-navy/90 dark:border-gray-800">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <NavLogo />
          </div>
          
          {/* Desktop Navigation */}
          <DesktopNavigation />
          
          {/* Auth Buttons (Desktop) */}
          <AuthButtons />
          
          {/* Mobile Menu Button */}
          <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
