import React from 'react';
import NavigationItem from './NavigationItem';
import ServicesDropdown from './dropdowns/ServicesDropdown';
import CalculatorsDropdown from './dropdowns/CalculatorsDropdown';
import AboutDropdown from './dropdowns/AboutDropdown';

const DesktopNavigation = () => {
    return (
        <div className="hidden md:flex items-center space-x-4">
            <NavigationItem to="/">Home</NavigationItem>
            <AboutDropdown/>
            <ServicesDropdown/>
            <NavigationItem to="/research">Research</NavigationItem>
            <CalculatorsDropdown/>
            <NavigationItem to="/contact">Contact</NavigationItem>
        </div>
    );
};

export default DesktopNavigation;
