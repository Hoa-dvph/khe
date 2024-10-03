import React, { useState } from 'react';
import CheckLogin from "@/components/client/CheckLogin";
import ProductPage from "@/components/client/ProductPage";
import Service from "@/components/client/Service";
import Sidebar from "@/components/client/Sidebar";

const HomePage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle the sidebar
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close the sidebar
  };

  return (
    <div className={`homepage ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Service component triggers the sidebar toggle */}
      <Service isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      {/* Sidebar with isOpen and close functionality */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main content with product grid */}
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <div className={`grid ${isSidebarOpen ? 'grid-cols-3' : 'grid-cols-4'} gap-6`}>
          <ProductPage />
          <ProductPage />
          <ProductPage />
          <ProductPage />
          <ProductPage />
          <ProductPage />
          <ProductPage />
          <ProductPage />
        </div>
      </div>

      {/* CheckLogin component */}
      <CheckLogin />
    </div>
  );
};

export default HomePage;
