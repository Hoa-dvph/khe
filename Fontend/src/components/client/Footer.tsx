import React from 'react';
import { FaInstagram, FaTwitter, FaPinterest, FaFacebook, FaLinkedin } from 'react-icons/fa';
import VectorLogo from '../../assets/images/Vector.svg';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div className="logo flex-shrink-0 mr-8">
          <img src={VectorLogo} alt="VNxLabs Logo" className="w-32 h-auto filter-white" />
        </div>

        {/* Built For Creatives */}
        <div>
          <h3 className="font-semibold mb-4">Built For Creatives</h3>
          <ul>
            <li><a href="#" className="hover:underline">Try Behance Pro</a></li>
            <li><a href="#" className="hover:underline">Find Inspiration</a></li>
            <li><a href="#" className="hover:underline">Get Hired</a></li>
            <li><a href="#" className="hover:underline">Sell Creative Assets</a></li>
            <li><a href="#" className="hover:underline">Sell Freelance Services</a></li>
          </ul>
        </div>

        {/* Find Talent */}
        <div>
          <h3 className="font-semibold mb-4">Find Talent</h3>
          <ul>
            <li><a href="#" className="hover:underline">Post a Job</a></li>
            <li><a href="#" className="hover:underline">Graphic Designers</a></li>
            <li><a href="#" className="hover:underline">Photographers</a></li>
            <li><a href="#" className="hover:underline">Video Editors</a></li>
            <li><a href="#" className="hover:underline">Web Designers</a></li>
            <li><a href="#" className="hover:underline">Illustrators</a></li>
          </ul>
        </div>

        {/* Behance */}
        <div>
          <h3 className="font-semibold mb-4">Behance</h3>
          <ul>
            <li><a href="#" className="hover:underline">About Behance</a></li>
            <li><a href="#" className="hover:underline">Adobe Portfolio</a></li>
            <li><a href="#" className="hover:underline">Download the App</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4">Social</h3>
          <ul>
            <li><a href="#" className="flex items-center space-x-2 hover:underline">
              <FaInstagram /><span>Instagram</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 hover:underline">
              <FaTwitter /><span>Twitter</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 hover:underline">
              <FaPinterest /><span>Pinterest</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 hover:underline">
              <FaFacebook /><span>Facebook</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 hover:underline">
              <FaLinkedin /><span>LinkedIn</span></a></li>
          </ul>
        </div>
      </div>

      {/* Footer bottom section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Right side: Copyright info */}
          <div className="text-gray-500">
            <span>© 2024 Adobe Inc. All rights reserved.</span>
          </div>

          {/* Left side: English and links */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">English</a>
            <span>|</span>
            <a href="#" className="hover:text-white">TOU</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Community</a>
            <a href="#" className="hover:text-white">Cookie preferences</a>
            <a href="#" className="hover:text-white">Do not sell or share my personal information</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
