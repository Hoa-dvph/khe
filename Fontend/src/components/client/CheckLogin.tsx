import React from 'react';
import { FaApple, FaFacebookF, FaGoogle } from 'react-icons/fa'; // Import icon từ react-icons

const CheckLogin = () => {
  return (
    <div className="checklogin text-center mt-2">
      <span className="block mb-4 text-gray-700">
        Sign up or <a href="#" className="underline text-blue-600 hover:text-blue-800">Sign In</a> to your
        account to view more work personalized to your preferences.
      </span>
      <div className="flex items-center justify-center space-x-4 mb-4">
        <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
          Sign Up With Email
        </a>
        <span className="text-gray-500 mx-2">or</span>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300">
            <FaApple className="text-gray-800 text-2xl" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300">
            <FaFacebookF className="text-blue-600 text-2xl" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300">
            <FaGoogle className="text-red-600 text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CheckLogin;
