
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    // <Link to="/" className="flex items-center">
    //   <span className="text-3xl font-serif font-bold text-cc-navy dark:text-white tracking-tight">
    //     Constant<span className="text-cc-gold">Capital</span>
    //   </span>
    // </Link>
    <Link to="/" className="flex items-center">
      {/* Light theme logo - visible in light mode */}
      <img 
        src="/lovable-uploads/7093d63c-ec73-43af-bf87-dc91b23c81a8.png" 
        alt="Constant Capital" 
        className="h-10 w-auto dark:hidden"
      />
      {/* Dark theme logo - visible in dark mode */}
      <img 
        src="/lovable-uploads/c05b6b3d-673c-43cd-92c1-ce160b898d22.png" 
        alt="Constant Capital" 
        className="h-10 w-auto hidden dark:block"
      />
    </Link>
  );
};

export default NavLogo;
