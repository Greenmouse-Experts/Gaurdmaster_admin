import React from "react";
import profile from "../../assets/profile.png";
import "../stylesheet/adminstyles.css";
import { BiLogoGmail } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile_left">
        <h2>Admin Details</h2>
        <div className="profile_head">
          <img src={profile} alt="" />
          <div>
            <h3>Admin</h3>
            <button>Update Photo</button>
          </div>
        </div>
        <div className="profile_body">
          <div>
            <span>
              <BiLogoGmail />
            </span>{" "}
            <div className="prof_card">
              <label htmlFor="email">Email</label>
              <h3>admin@gmail.com</h3>
            </div>
          </div>
          <div>
            <span>
              <FaUserCog />
            </span>
            <div className="prof_card">
              <label htmlFor="phone">Type</label>
              <h3>Administrator</h3>
            </div>
          </div>
         
         
        </div>
      </div>

      <div className="profile_right">
        <form action="submit">
          <h2>Update Profile</h2>

          <div className="input">
            <label htmlFor="firstname">Name</label>
            <div>
              <input
                type="text"
                name="login_details"
                placeholder="Enter Name"
              />
            </div>
            </div>
          
          <div className="input">
            <label htmlFor="phone">Email</label>
            <div>
              <input
                type="email"
                name="login_details"
                placeholder="Enter New Email"
              />
            </div>
          </div>

          <button>Update Profile</button>
        </form>
        <form action="submit">
          <h2>Change Password</h2>

          <div className="input">
            <label htmlFor="newwpass">New Password</label>
            <div>
              <input
                type="text"
                name="login_details"
                placeholder="Enter New Password"
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="confirmnew">Confirm New Password</label>
            <div>
              <input
                type="text"
                name="login_details"
                placeholder="Re-Enter Password"
              />
            </div>
          </div>

          <button>Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
