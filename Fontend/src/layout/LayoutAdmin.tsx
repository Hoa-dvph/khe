import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaChartBar, FaNewspaper, FaUsers, FaCog, FaSignOutAlt, FaBars, FaEnvelope } from 'react-icons/fa';

const LayoutAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center">
          {sidebarOpen && <h1 className="text-2xl font-bold">Admin</h1>}
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <FaBars size={24} />
          </button>
        </div>
        <nav className="mt-8">
          <Link to="/admin" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaChartBar className="mr-3" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link to="/admin/posts" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaNewspaper className="mr-3" />
            {sidebarOpen && <span>Posts</span>}
          </Link>
          <Link to="/admin/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaUsers className="mr-3" />
            {sidebarOpen && <span>Users</span>}
          </Link>
          <Link to="/admin/contacts" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaEnvelope className="mr-3" />
            {sidebarOpen && <span>Contacts</span>}
          </Link>
          <Link to="/admin/settings" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaCog className="mr-3" />
            {sidebarOpen && <span>Settings</span>}
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800">Admin Panel</h2>
            <div className="flex items-center">
              <span className="mr-4">Welcome, Admin</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;