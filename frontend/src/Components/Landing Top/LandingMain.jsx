import React from "react";
import "./LandingMain.css";
import logo from "../Assets/logo.jpeg";
import { Link } from "react-router-dom";

const LandingMain = () => {
  return (
    <div className="landing-top">
      <div className="landing-nav">
        <div className="land-nav-left">
          <div className="logo">
            <h2>Taskify</h2>
          </div>
          <div className="land-nav-left-items">
            <ul>
              <Link to='/signup'><li>Get Started</li></Link>
              <li>Contact Us</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
        <div className="land-nav-right">
          <Link to='/signin'><a>Login</a></Link>
        </div>
      </div>
      <div className="text-img-container">
        <div className="text-container">
          <div className="logo-img">
            <img src={logo} alt="" />
          </div>
          <div className="tagline">
            <h1>Empower Your</h1>
            <h1>Productivity</h1>
          </div>
          <div className="desc-text">
            <p>
              {" "}
              Taskify is your go-to tool for keeping track of everything in one
              place. Simplify your life, achieve your goals, and never miss a
              beat. Get started today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMain;
