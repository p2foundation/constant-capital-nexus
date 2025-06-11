
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavigationItem = ({ to, children, onClick }: NavigationItemProps) => {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-sm font-medium text-cc-navy hover:text-cc-blue transition-colors dark:text-white dark:hover:text-cc-gold"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavigationItem;
