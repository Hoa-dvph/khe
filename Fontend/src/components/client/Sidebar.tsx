import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar mt-6" id="sidebar">
      <button id="closeSidebar" className="close-btn">
        <i className="fas fa-times"></i> {/* Icon đóng */}
      </button>
      <button id="filterBtnSidebar" className="flex items-center space-x-2 mb-5">
        <img src="./assets/images/setting.svg" alt="" className="w-5 h-5" />
        <span>Filter</span>
      </button>

      {/* Sidebar Buttons */}
      <ul className="sidebar-content-button">
        <li><a href="#" className="sidebar-btn" data-target="project">Project</a></li>
        <li><a href="#" className="sidebar-btn" data-target="assets">Assets</a></li>
        <li><a href="#" className="sidebar-btn" data-target="images">Images</a></li>
        <li><a href="#" className="sidebar-btn" data-target="people">People</a></li>
      </ul>

      {/* Sidebar Content Service */}
      <ul className="sidebar-content-service mt-6">
        {/* Project Content */}
        <div className="service-content hidden" id="project">
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-cubes mr-2"></i>Creative Fields</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-clock mr-2"></i>Availability</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-map-marker-alt mr-2"></i>Location</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-wrench mr-2"></i>Tools</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-palette mr-2"></i>Color</a>
          </li>
        </div>

        {/* Assets Content */}
        <div className="service-content hidden" id="assets">
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-tag icon mr-2"></i>Price</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-th-large icon mr-2"></i>Categories</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-file icon mr-2"></i>File Extensions</a>
          </li>
        </div>

        {/* Images Content */}
        <div className="service-content hidden" id="images">
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-cubes mr-2"></i>Creative Fields</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-wrench mr-2"></i>Tools</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-palette mr-2"></i>Color</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-camera mr-2"></i>Camera</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-video mr-2"></i>Lens</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-sun mr-2"></i>Exposure</a>
          </li>
        </div>

        {/* People Content */}
        <div className="service-content hidden" id="people">
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-cubes mr-2"></i>Creative Fields</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-map-marker-alt mr-2"></i>Location</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-wrench mr-2"></i>Tools</a>
          </li>
          <hr className="border-t border-gray-300 mt-2" />
          <li className="flex items-center justify-between">
            <a href="#" className="flex items-center"><i className="fas fa-clock mr-2"></i>Availability</a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
