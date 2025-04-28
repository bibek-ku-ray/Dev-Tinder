import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {

  const user = useSelector((state) => state.user.data)
  console.log(user)

  return (
    <div>
      <div className="navbar bg-base-300 shadow-xs shadow-primary">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <img width={`20px`} height={`20px`} alt="logo" src="/parrot.svg" />
            <code>devTinder</code>
          </a>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
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
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to={`/signup`} className="btn btn-soft btn-primary">Signup</Link>
            <Link to={`/login`} className="btn btn-soft btn-success">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
