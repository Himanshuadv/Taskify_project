import React, { useEffect, useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  googleAuthProvider,
  githubAuthProvider,
} from "../Firebase Auth/config";
import { signInWithPopup } from "firebase/auth";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";



const Signin = () => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const user = userCredential.user;
      console.log(user);
      // Access email and name
      loginFormData.email = user.email;
      loginFormData.password =user.uid;
<<<<<<< HEAD
      const response = await fetch("http://localhost:5000/signin", {
=======
      const response = await fetch("http://localhost:8000/signin", {
>>>>>>> 990ceee3719f9f1f3266e97c13f41f927648da7f
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        alert(data.errorMessage);
      }
      // setGoogleEmail(user.email);
      // localStorage.setItem("googleEmail", user.email);

      // setTokenId(token); // Update the state with the token
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, githubAuthProvider);
     
      const gitHubId = data.user.uid;
      const gitHubEmail = gitHubId + '@gmail.com';
      const password = data.user.uid;
  
      const loginFormData = {
        email: gitHubEmail,
        password: password, // Replace this with a secure method for generating passwords
      };
  
<<<<<<< HEAD
      const response = await fetch("http://localhost:5000/signin", {
=======
      const response = await fetch("http://localhost:8000/signin", {
>>>>>>> 990ceee3719f9f1f3266e97c13f41f927648da7f
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        alert(data.errorMessage);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        alert(data.errorMessage);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signin">
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form
          onSubmit={handleSubmit}
          className="form"
          action="/signin"
          method="post"
        >
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Email"
            value={loginFormData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className="password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              className="input"
              name="password"
              placeholder="Password"
              value={loginFormData.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <div className="eye" onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <AiOutlineEye className="eye-icon" size={20} />
              ) : (
                <AiOutlineEyeInvisible className="close-eye-icon" size={20} />
              )}
            </div>
          </div>
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button className="form-btn" type="submit">
            Log in
          </button>
        </form>
        <p className="sign-up-label">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="sign-up-link">Sign up</span>
          </Link>
        </p>
        <div className="buttons-container">
          <div onClick={handleGithubSignIn} className="apple-login-button">
            <AiOutlineGithub size={24} />
            <span>Log in with Github</span>
          </div>
          <div className="google-login-button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              x="0px"
              y="0px"
              className="google-icon"
              viewBox="0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span onClick={handleGoogleSignIn}>Log in with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;