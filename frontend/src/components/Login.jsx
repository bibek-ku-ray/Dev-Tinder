import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    await axios
      .post(`${BASE_URL}/auth/login`, loginData, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center mt-24 ">
      <div className="card card-border bg-base-300 w-96 shadow-primary shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
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
            Already registered?
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
