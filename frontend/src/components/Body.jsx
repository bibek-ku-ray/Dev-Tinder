import React, { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const Body = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((state) => state.user);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));

      const savedPath = sessionStorage.getItem("lastPath") || location.pathname;

      if (
        savedPath === "/" ||
        savedPath === "/login" ||
        savedPath === "/signup"
      ) {
        navigate("/feed");
      } else {
        navigate(savedPath);
      }
      
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }

      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    // Only save protected routes
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      sessionStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname]);

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
