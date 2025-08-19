
import React from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggler from '@/components/ThemeToggler';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton = ({ isMenuOpen, toggleMenu }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggler />
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-3 rounded-lg text-cc-navy hover:text-cc-blue focus:outline-none dark:text-white dark:hover:text-cc-gold transition-colors min-h-[44px] min-w-[44px]"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default MobileMenuButton;
