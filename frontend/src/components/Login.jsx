import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios
      .post(`${BASE_URL}/auth/login`, loginData, {
        withCredentials: true,
      })
      .then(function (response) {
        dispatch(addUser(response.data));
        navigate("/feed");
      })
      .catch(function (error) {
        console.log(error);
        setErrMessage(error?.response?.data?.error);
      });
  };

  const clearError = () => {
    setErrMessage("");
  };

  return (
    <div className="flex items-center justify-center mt-24 ">
      <div className="card card-border bg-base-300 w-96 shadow-primary shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login Now</h2>
          {errMessage && (
            <div
              role="alert"
              className="alert alert-error alert-soft flex justify-between items-center"
            >
              <div>
                <p>{errMessage}</p>
              </div>

              <button onClick={clearError} className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          )}
          <label className="label">Email {loginData.email}</label>
          <input
            className="input validator"
            type="email"
            required
            placeholder="Email"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <div className="validator-hint mt-0">Enter valid email address</div>

          <label className="label">Password {loginData.password}</label>
          <input
            type="password"
            className="input validator"
            required
            placeholder="Password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
          <p className="validator-hint mt-0">
            Must be more than 8 characters, including one number, one lowercase
            letter, one uppercase letter
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary px-12 " onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="card-actions justify-center">
            Don't have account?
            <Link className="link link-primary" to={`/signup`}>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
