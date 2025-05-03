import React from 'react'
import {Link} from "react-router-dom"

const Hero = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen -mt-10">
        <div className="hero-content text-center ">
          <div className="max-w-lg">
            <h1 className="text-9xl font-bold text-shadow-primary text-shadow-sm">Hi, there</h1>
            <p className="py-6 text-2xl">
              Find your coding companion 🧑‍💻
            </p>
            <Link to={`/login`} className="btn btn-primary px-24 text-xl ">Join us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero