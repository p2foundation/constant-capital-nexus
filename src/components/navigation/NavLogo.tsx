
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-3xl font-serif font-bold text-cc-navy dark:text-white tracking-tight">
        Constant<span className="text-cc-gold">Capital</span>
      </span>
    </Link>
  );
};

export default NavLogo;
