import React from "react";
import { IoClose } from "react-icons/io5";

const Create = ({ onClose }) => {
  return (
    <div className="add_member">
      <div className="add_head">
        <p>Student Create</p>{" "}
        <span onClick={onClose}>
          <IoClose />
        </span>
      </div>
      <form action="submit" className="add_mem form_create">
        <div className="input">
          <label htmlFor="">Full Name</label>
          <div>
            <input placeholder="Full Name" id="name" name="name" type="text" />
          </div>
        </div>
        <div className="input">
          <label htmlFor="">Email Address</label>
          <div>
            <input placeholder="Enter Email" id="name" name="name" type="email" />
          </div>
        </div>
        <div className="input">
          <label htmlFor="">Password </label>
          <div>
            <input placeholder="Name" id="name" name="name" type="password" />
          </div>
        </div>
        <div className="input">
          <label htmlFor="">Confirm Password </label>
          <div>
            <input placeholder="Name" id="name" name="name" type="password" />
          </div>
        </div>

        <button className="add_btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Create;
