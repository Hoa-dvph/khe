import React from "react";
import Header from "../components/client/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/client/Footer";

const LayoutCLient = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutCLient;