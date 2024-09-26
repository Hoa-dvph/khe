import React from 'react';
import VectorFillter from '../../assets/images/setting.svg';
import VectorSearch from '../../assets/images/search.svg';
import VectorUpload from '../../assets/images/upload.svg';
const Service = () => {
  return (
    <div className="service flex items-center justify-between mb-6 mt-10">
      {/* Filter Button */}
      <button id="filterBtn" className="btn flex items-center space-x-2">
        <img src={VectorFillter} alt="" className="w-5 h-5" />
        <span>Filter</span>
      </button>

      {/* Search Box */}
      <div className="search-box flex items-center space-x-2 flex-grow mx-4 rounded-full p-2">
        <img src={VectorSearch} alt="" className="w-5 h-5 ml-4" />
        <input
          type="text"
          placeholder="Search the creative world at work"
          className="flex-grow px-4 py-0"
        />
        <button className="btn flex items-center space-x-1">
          <img src={VectorUpload} alt="" className="w-5 h-5" />
          <span>Search by Image</span>
        </button>
      </div>

      {/* Recommended Button */}
      <button className="recommended flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
        Recommended <span className="ml-2"><i className="fas fa-caret-down"></i></span>
      </button>
    </div>
  );
};

export default Service;
