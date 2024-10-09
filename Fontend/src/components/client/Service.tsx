import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import VectorUpload from "../../assets/images/upload.svg"; // Adjust path to your image

interface ServiceProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Service: React.FC<ServiceProps> = ({
  isSidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <div
      className={`service-container ${
        isSidebarOpen ? "service-small" : "service-normal mt-20"
      } flex items-center justify-between mb-5 mt-5`}
    >
      {!isSidebarOpen && (
        <button
          onClick={onToggleSidebar}
          className="btn flex items-center space-x-2"
        >
          <SettingsIcon className="w-5 h-5" />
          <span>Fillter</span>
        </button>
      )}
      {/* Search Box */}
      <div className="search-box flex items-center space-x-2 flex-grow mx-3 rounded-full ">
        <input
          type="text"
          placeholder="Search the creative world at work"
          className="flex-grow px-4 py-0"
        />
        <button className="btn flex items-center space-x-1">
          <img src={VectorUpload} alt="Search by Image" className="w-5 h-5" />
          <span>Search by Image</span>
        </button>
      </div>

      <button className="recommended flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
        Recommended{" "}
        <span className="ml-2">
          <i className="fas fa-caret-down"></i>
        </span>
      </button>
    </div>
  );
};

export default Service;
