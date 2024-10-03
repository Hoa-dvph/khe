import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ToolsIcon from '@mui/icons-material/Build';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CategoryIcon from '@mui/icons-material/Category';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LensIcon from '@mui/icons-material/Lens';
import ExposureIcon from '@mui/icons-material/Exposure';
import FieldIcon from '@mui/icons-material/Grain';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection((prevSection) => (prevSection === section ? null : section));
  };

  return (
    <div className={`sidebar ${isOpen ? "show" : ""}`} id="sidebar">
      <button id="closeSidebar" className="close-btn" onClick={onClose}>
        <CloseIcon /> {/* Close icon from MUI */}
      </button>

      <button onClick={onClose} id="filterBtnSidebar" className="flex items-center space-x-2 mb-5">
        <SettingsIcon className="w-5 h-5" /> {/* Settings icon from MUI */}
        <span>Filter</span>
      </button>

      {/* Sidebar content */}
      <ul className="sidebar-content-button">
        <li>
          <button onClick={() => toggleSection("project")} className="sidebar-btn flex justify-between items-center">
            Project {expandedSection === "project" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
          {expandedSection === "project" && (
            <ul className="ml-6">
              {renderServiceContent("Creative Fields", <FieldIcon />)}
              {renderServiceContent("Availability", <ScheduleIcon />)}
              {renderServiceContent("Location", <LocationOnIcon />)}
              {renderServiceContent("Tools", <ToolsIcon />)}
              {renderServiceContent("Color", <ColorLensIcon />)}
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleSection("assets")} className="sidebar-btn flex justify-between items-center">
            Assets {expandedSection === "assets" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
          {expandedSection === "assets" && (
            <ul className="ml-6">
              {renderServiceContent("Price", <PriceCheckIcon />)}
              {renderServiceContent("Categories", <CategoryIcon />)}
              {renderServiceContent("File Extensions", <ChevronRightIcon />)}
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleSection("images")} className="sidebar-btn flex justify-between items-center">
            Images {expandedSection === "images" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
          {expandedSection === "images" && (
            <ul className="ml-6">
              {renderServiceContent("Creative Fields", <FieldIcon />)}
              {renderServiceContent("Tools", <ToolsIcon />)}
              {renderServiceContent("Color", <ColorLensIcon />)}
              {renderServiceContent("Camera", <CameraAltIcon />)}
              {renderServiceContent("Lens", <LensIcon />)}
              {renderServiceContent("Exposure", <ExposureIcon />)}
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleSection("people")} className="sidebar-btn flex justify-between items-center">
            People {expandedSection === "people" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
          {expandedSection === "people" && (
            <ul className="ml-6">
              {renderServiceContent("Creative Fields", <FieldIcon />)}
              {renderServiceContent("Location", <LocationOnIcon />)}
              {renderServiceContent("Tools", <ToolsIcon />)}
              {renderServiceContent("Availability", <ScheduleIcon />)}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

// Helper function for rendering child items
const renderServiceContent = (label: string, icon: JSX.Element) => (
  <li className="flex items-center justify-between my-2">
    <a href="#" className="flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </a>
    <hr className="border-t border-gray-300 opacity-50 mt-2" /> {/* Faded line separator */}
  </li>
);

export default Sidebar;
