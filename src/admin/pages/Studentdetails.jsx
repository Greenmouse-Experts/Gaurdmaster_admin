import React from 'react'
import { BiLogoGmail } from "react-icons/bi";
import {  FaPhoneAlt, FaAddressBook, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import profile from "../../assets/user.png"
import { FaXTwitter } from "react-icons/fa6";

const Studentdetails = () => {
  return (
    <div className="profile_left stu_det">
        <h2>Student Details</h2>
        <div className="profile_head">
          <img src={profile} alt="" />
          <div>
            <h3>Jeff Epstien</h3>
           
          </div>
        </div>
        <div className="profile_body">
          <div>
            <span>
              <BiLogoGmail />
            </span>{" "}
            <div className="prof_card">
              <label htmlFor="email">Email</label>
              <h3>jeffepstien@gmail.com</h3>
            </div>
          </div>
          <div>
            <span>
              <FaPhoneAlt />
            </span>
            <div className="prof_card">
              <label htmlFor="phone">Phone</label>
              <h3>07023790729</h3>
            </div>
          </div>
          <div>
            <span>
            <FaAddressBook />
            </span>
            <div className="prof_card">
              <label htmlFor="register">Address</label>
              <h3>No 8 Company address. Nigeria.</h3>
            </div>
          </div>
          <div>
            <span>
            <FaLinkedinIn />
            </span>
            <div className="prof_card">
              <label htmlFor="register">Linkedin</label>
              <h3>N/A</h3>
            </div>
          </div>
          <div>
            <span>
            <FaFacebookF />
            </span>
            <div className="prof_card">
              <label htmlFor="register">Facebook</label>
              <h3>N/A</h3>
            </div>
          </div>
          <div>
            <span>
            <FaXTwitter />
            </span>
            <div className="prof_card">
              <label htmlFor="register">Facebook</label>
              <h3>N/A</h3>
            </div>
          </div>
         
        </div>
      </div>
  )
}

export default Studentdetails