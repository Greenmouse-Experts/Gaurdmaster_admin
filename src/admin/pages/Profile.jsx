import React, { useState } from "react";
import profile from "../../assets/profile.png";
import "../stylesheet/adminstyles.css";
import { BiLogoGmail } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { changePassword, updateProfile } from "../../services/api/authApi";
import { uploadImage } from "../../services/api/routineApi";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [change, setChange] = useState(false)
  const { user, saveUser } = useAuth();
  const [userDetail, setUserDetail] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: ""
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const Update = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
  });
  const changePass = useMutation({
    mutationFn: changePassword,
    mutationKey: ['password-change']
  })
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        picture: data.image,
      };
      Update.mutate(payload, {
        onSuccess: () => {
          saveUser({
            ...user,
            image: data.image,
          });
          toast.success("Profile Photo Updated Successfully");
          setIsUpdate(false);
        },
        onError: () => {
          toast.error("Something went wrong");
          setIsUpdate(false);
        },
      });
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });
  const handleChangePicture = async (e) => {
    setIsUpdate(true);
    if (!e.target.files) return;
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    mutation.mutate(fd);
  };
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsBusy(true);
    const payload = {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
    };
    Update.mutate(payload, {
      onSuccess: () => {
        saveUser({
          ...user,
          firstName: payload.firstName,
          lastName: payload.lastName,
        });
        toast.success("Profile Updated Successfully");
        setIsBusy(false);
      },
      onError: () => {
        toast.error("Something went wrong");
        setIsBusy(false);
      },
    });
  };
  const handleChangePassword = (e) => {
    e.preventDefault()
    if(userDetail.newPassword !== userDetail.newPasswordConfirmation){
      toast.info('Password does not match')
      return;
    }
    setChange(true)
    const payload = {
      oldPassword: userDetail.oldPassword,
      newPassword: userDetail.newPassword,
      newPasswordConfirmation: userDetail.newPasswordConfirmation
    }
    changePass.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message)
        setChange(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message);
        setChange(false);
      },
    })
  }
  return (
    <div className="profile">
      <div className="profile_left">
        <h2>Admin Details</h2>
        <div className="profile_head">
          <img src={user.image ? user.image : profile} alt="profile" />
          <div>
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <button>
              <input
                type="file"
                accept="image/*"
                onChange={handleChangePicture}
                className="absolute top-0 right-0"
              />
              {isUpdate? "..." : "Update Photo"}
            </button>
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
        <form action="submit" onSubmit={handleProfileSubmit}>
          <h2>Update Profile</h2>

          <div className="input">
            <label htmlFor="firstname">First Name</label>
            <div>
              <input
                type="text"
                value={userDetail.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                name="login_details"
                placeholder="Enter Name"
              />
            </div>
          </div>

          <div className="input">
            <label htmlFor="lastName">Last Name</label>
            <div>
              <input
                type="text"
                name="login_details"
                value={userDetail.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter New Email"
              />
            </div>
          </div>

          <button>{isBusy? "Updating..." : "Update Profile"}</button>
        </form>
        <form action="submit" onSubmit={handleChangePassword}>
          <h2>Change Password</h2>
          <div className="input">
            <label htmlFor="newwpass">Old Password</label>
            <div>
              <input
                type="password"
                name="login_details"
                value={userDetail.oldPassword}
                onChange={(e) => handleChange('oldPassword', e.target.value)}
                placeholder="Enter Old Password"
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="newwpass">New Password</label>
            <div>
              <input
                type="password"
                name="login_details"
                placeholder="Enter New Password"
                value={userDetail.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="confirmnew">Confirm New Password</label>
            <div>
              <input
                type="password"
                name="login_details"
                placeholder="Re-Enter Password"
                value={userDetail.newPasswordConfirmation}
                onChange={(e) => handleChange('newPasswordConfirmation', e.target.value)}
              />
            </div>
          </div>

          <button>{change? "Updating..." : "Update Password"}</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
