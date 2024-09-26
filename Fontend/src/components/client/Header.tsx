import React from 'react';
import { FaCaretDown } from 'react-icons/fa'; 
import VectorLogo from '../../assets/images/Vector.svg';
import VectorNotifications from '../../assets/images/Notifications.svg';
import VectorAdobe from '../../assets/images/Adobe.svg';

const Header = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="header flex items-center justify-between bg-white p-4 shadow-md">
        {/* Logo */}
        <div className="logo flex-shrink-0 mr-8">
          <img src={VectorLogo} alt="VNxLabs Logo" className="w-32 h-auto" />
        </div>

        {/* Navigation Bar */}
        <div className="nav-bar flex-grow">
          <ul className="flex space-x-6">
            <li className="relative group">
              <a href="#" className="flex items-center text-gray-800 hover:text-blue-600">
                Explore <span className="ml-2"><FaCaretDown /></span>
              </a>
              <ul className="absolute left-0 mt-2 hidden w-48 bg-white border border-gray-200 shadow-lg submenu group-hover:block">
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 1</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 2</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 3</a></li>
              </ul>
            </li>
            <li><a href="#" className="text-gray-800 hover:text-blue-600">Asset</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-600">Jobs</a></li>
            <li><a href="#" className="text-gray-800 hover:text-blue-600">Behance <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded ml-1">Pro</span></a></li>
            <li className="relative group">
              <a href="#" className="flex items-center text-gray-800 hover:text-blue-600">
                Hire Freelancers <span className="ml-2"><FaCaretDown /></span>
              </a>
              <ul className="absolute left-0 mt-2 hidden w-48 bg-white border border-gray-200 shadow-lg submenu group-hover:block">
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Freelancer 1</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Freelancer 2</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Freelancer 3</a></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Notifications */}
        <div className="notifications flex-shrink-0 mr-4">
          <img src={VectorNotifications} alt="Notifications" className="w-4 h-auto" />
        </div>

        {/* Sign In / Sign Up */}
        <div className="flex items-center space-x-4">
          <div className="sign-in cursor-pointer border border-gray-300 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600">
            <p>Sign In</p>
          </div>
          <div className="sign-up cursor-pointer bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700">
            <p>Sign Up</p>
          </div>
        </div>

        {/* Adobe */}
        <div className="adobe flex-shrink-0 mr-4 ml-4">
          <img src={VectorAdobe} alt="Adobe" className="w-18 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Header;
