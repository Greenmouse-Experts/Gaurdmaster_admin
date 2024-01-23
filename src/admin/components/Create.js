import React from "react";
import { IoClose } from "react-icons/io5";

const Create = ({ onClose }) => {
  return (
    <div className="add_member">
      
      <div className="add_head">
        <p>Add Event Category</p>{" "}
        <span onClick={onClose}>
          <IoClose />
        </span>
      </div>
      <form action="submit" className="add_mem">
        <div className="input_log">
          <div>
            <input placeholder="Name" id="name" name="name" type="text" />
          </div>
        </div>

        <div className="input_log">
          <div>
            <textarea
              placeholder="Description"
              name="desc"
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>

        <button className="add_btn" type="submit">
          Create{" "}
        </button>
      </form>
    </div>
  );
};

export default Create;
