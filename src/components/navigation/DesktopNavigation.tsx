
import React from 'react';
import NavigationItem from './NavigationItem';
import ServicesDropdown from './dropdowns/ServicesDropdown';
import CalculatorsDropdown from './dropdowns/CalculatorsDropdown';
import AboutDropdown from './dropdowns/AboutDropdown';
import ResearchHubDropdown from './dropdowns/ResearchHubDropdown';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavigationItem to="/">Home</NavigationItem>
      
      <NavigationMenu>
        <NavigationMenuList>
          <AboutDropdown />
          <ServicesDropdown />
          <ResearchHubDropdown />
          <CalculatorsDropdown />
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationItem to="/faqs">FAQs</NavigationItem>
      <NavigationItem to="/contact">Contact Us</NavigationItem>
    </div>
  );
};

export default DesktopNavigation;
