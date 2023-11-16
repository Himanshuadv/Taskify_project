import React from "react";
import "./LandingMain.css";
import logo from "../Assets/logo.jpeg";
import logo2 from "../Assets/logo2.jpeg"
import { Link } from "react-router-dom";
import { MdTaskAlt } from 'react-icons/md'

const LandingMain = () => {
  return (
    <div className="landing-top">
      <div className="landing-nav">
        <div className="land-nav-left">
          <div className="logo">
            < MdTaskAlt size={50}/>
            <h2>Taskify</h2>
          </div>
          <div className="land-nav-left-items">
            <ul>
              <Link to='/signup'><li>Get Started</li></Link>
              <li>Contact Us</li>
              <Link to='/aboutus'><li>About Us</li></Link>
            </ul>
          </div>
        </div>
        <div className="land-nav-right">
          <Link to='/signin'><a href="/signin">Login</a></Link>
        </div>
      </div>
      <div className="text-img-container">
      <div className="logo-img">
            <img src={logo} alt="" />
          </div>
        <div className="text-container">
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
        <Link to='/signup'><button class="button">
  Get Started
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></Link>
      </div>
    </div>
  );
};

export default LandingMain;
