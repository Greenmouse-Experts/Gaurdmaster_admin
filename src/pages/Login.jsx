import React, { useState } from "react";
import logo from "../assets/wlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import "../Stylesheet/login.css";
import log from "../assets/logo.png";
import { AdminLogin } from "../services/api/authApi";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    const payload = {
      email: userDetail.email,
      password: userDetail.password,
    };
    await AdminLogin(payload)
      .then(() => {
        toast.success("Login Successful");
        setIsBusy(false);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setIsBusy(false);
      });
  };


  return (
    <div className="main_login">
      <div className="side1">
        <div>
          <img src={'https://res.cloudinary.com/greenmouse-tech/image/upload/v1706278834/rsh/logo2-removebg-preview_fcvxwc.png'} alt="" />
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
            <img src={'https://res.cloudinary.com/greenmouse-tech/image/upload/v1706009611/GuardMaster/Guardmaster_transparent_1_ucddxt.png'} alt="logo" />
            <h3>Welcome Back!</h3>
          </div>
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit} className="login_form">
            <div className="input">
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={userDetail.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={userDetail.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <span className="toggle-password" onClick={togglePassword}>
                  <span className="eye-icon">
                    <AiFillEye />
                  </span>
                </span>
              </div>
            </div>
            <button>{isBusy? "Logging In..." : "Login"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
