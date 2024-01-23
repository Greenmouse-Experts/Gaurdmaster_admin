import React, { useState } from "react";
import logo from "../assets/wlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import "../Stylesheet/login.css";
import log from "../assets/logo.png"



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };


  const navigate = useNavigate();
  
  
  
  const handleSubmit = () => {
    navigate("/admin")
  }

  return (
    <div className="main_login">
      <div className="side1">
        <div>
          <img src={logo} alt="" />
          <div>
            <h3>Welcome Admin!</h3>
            <p>
              Your security is our priority. Log in now to access your account
              and stay updated on all safety measures and reports.
            </p>
          </div>

        </div>
      </div>
      <div className="side2">
              
        <div className="login">
        <div className="login_logo">
            <img src={log} alt="" />
            <h3>Welcome Back!</h3>
        </div>
          <h2>Admin Login</h2>
          {/* <div className="go">
            <span>
              <img src={go} alt="" />
            </span>

            <p>Continue with Google</p>
          </div> */}

          
          <form onSubmit={handleSubmit} className="login_form">
            {/* <span className="or">or</span> */}

            <div className="input">
              <label htmlFor="email">Email</label>
              <div>
                <input type="text" placeholder="Enter Email" />
              </div>
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  
                />
                <span className="toggle-password" onClick={togglePassword}>
                  <span className="eye-icon">
                    <AiFillEye />
                  </span>
                </span>
              </div>
            </div>

            <Link>Forgot Password?</Link>
            <button onClick={handleSubmit}> Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
