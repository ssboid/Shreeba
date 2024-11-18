import React from 'react';
import LogoWhite from "../../assets/brand/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-32 pt-24 mt-24">
      <div className="container mx-auto px-[8.33%] flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        
        {/* Logo and Description */}
        <div className="flex-shrink-0">
          <img src={LogoWhite} alt="logo" className="h-12 mb-4" />
          <p className="text-gray-400 w-72 text-left">Inventory tracker allows you to efficiently manage your stock.</p>
        </div>
        
        {/* Company Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-left">Company</h3>
          <ul className="space-y-1 text-gray-300 text-left">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Features</a></li>
          </ul>
        </div>
        
        {/* Help Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-left">Help</h3>
          <ul className="space-y-1 text-gray-300 text-left">
            <li><a href="#" className="hover:text-white">Customer Support</a></li>
            <li><a href="#" className="hover:text-white">Terms and conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
