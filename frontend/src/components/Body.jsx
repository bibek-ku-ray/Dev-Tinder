import React from "react";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx";

const Body = () => {
  return (
    <div>
      <div className="h-screen">
        <Navbar />
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};
export default Body;
