import React from "react";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx";

const Body = () => {
  return (
    <div className="">
      <div>
        <Navbar />
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Body;
