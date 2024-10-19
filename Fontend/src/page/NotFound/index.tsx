import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
            404
          </h1>
          <div className="bg-blue-100 text-blue-600 px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Oops! You seem to be lost.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;