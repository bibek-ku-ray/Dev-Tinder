import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeRequest } from "../utils/requestSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`,{}, {
        withCredentials: true,
      });
      dispatch(removeUser());
      dispatch(removeFeed())
      dispatch(removeRequest())
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="">
      <div className="navbar bg-base-300 shadow-xs shadow-primary">
        <div className="flex-1">
          <Link
            to={`${user ? "/feed" : "/"}`}
            className="btn btn-ghost text-xl"
          >
            <img width={`20px`} height={`20px`} alt="logo" src="/parrot.svg" />
            <code>devTinder</code>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <p>{user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={`${user?.profilePicture}`}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={`/profile`} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/request`}>Requests</Link> 
                </li>
                <li>
                  <Link to={`/connection`}>Connections</Link> 
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* <Link to={`/signup`} className="btn btn-soft btn-primary">
              Signup
            </Link>
            <Link to={`/login`} className="btn btn-soft btn-success">
              Login
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
