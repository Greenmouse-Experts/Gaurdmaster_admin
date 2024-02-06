import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { createSubadmin } from "../../../services/api/usersApi";
import { toast } from "react-toastify";

const AddAdmin = ({close, refetch}) => {
  const create = useMutation({
    mutationFn: createSubadmin,
    mutationKey: ['createSub']
  })
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: ""
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault()
    if(userDetail.password !== userDetail.confirmPassword){
      toast.error('Password does not match')
      return;
    }
    setIsBusy(true)
    create.mutate(userDetail, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsBusy(false)
        refetch()
        close()
      },
      onError: (error) => {
          toast.error(error.response.data.message)
          setIsBusy(false)
      }
    })
  }
  return (
    <>
      <div className="px-4">
        <form action="" onSubmit={submitAction}>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="input">
              <label>First Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={userDetail.firstName}
                  required
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Last Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={userDetail.lastName}
                  required
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={userDetail.email}
                  required
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Phone Number</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={userDetail.phone}
                  required
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Password</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={userDetail.password}
                  required
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <span className="toggle-password" onClick={togglePassword}>
                  <span className="eye-icon">
                    <AiFillEye />
                  </span>
                </span>
              </div>
              </div>
              <div className="input">
              <label htmlFor="password">Confirm Password</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Re-enter Password"
                  value={userDetail.confirmPassword}
                  required
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                />
                <span className="toggle-password" onClick={togglePassword}>
                  <span className="eye-icon">
                    <AiFillEye />
                  </span>
                </span>
              </div>
              </div>
          </div>
          <div className="mt-12 flex justify-end">
            <button className="btn-primary w-6/12 py-3 fw-500 lg:text-lg">{isBusy? "Submiting..." : "Submit"}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAdmin;
