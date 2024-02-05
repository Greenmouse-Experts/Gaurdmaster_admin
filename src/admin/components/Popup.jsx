import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const Popup = ({ onClose }) => {
  return (
    <div className="add_member">
      <div className="add_head">
        <p>Add New Member</p>{" "}
        <span onClick={onClose}>
          <IoClose />
        </span>
      </div>
      <form action="submit" className="add_mem">
        <div>
          <input type="checkbox" name="check" id="check" />
          <label  htmlFor="check">Mini MBA</label>
        </div>
        <div>
          <input type="checkbox" name="check1" id="check1" />
          <label htmlFor="check1">Professional Proficiency Diploma (PPD) Programs</label>
        </div>
        <div>
          <input type="checkbox" name="check2" id="check2" />
          <label htmlFor="check2">Professional Proficiency Certificate (PPC) Programs</label>
        </div>
        <div>
          <input type="checkbox" name="check3" id="check3" />
          <label htmlFor="check3">Provincial Licensing And Professional Certification Programs</label>
        </div>  
        <button className="add_btn" type="submit" x>
          Save
        </button>
      </form>
    </div>
  );
};

export default Popup;
