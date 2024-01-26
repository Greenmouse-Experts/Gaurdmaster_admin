import React from 'react'
import "../stylesheet/adminstyles.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";


const Usercreate = () => {
  return (
    <div className="adminman">
        <div className="admin_head">
            <h2>User Create</h2>
            <Link to="/admin/admins"><FaPlus /> Show All User</Link>
        </div>
        
      <form action='' className="create_form">
        <div className="create_input">
            <label htmlFor="">Name*</label>
            <input type="text" />
        </div>
        <div className="create_input">
        <label htmlFor="">Email Address*</label>
            <input type="email" />
        </div>
        <div className="create_input">
        <label htmlFor="">Password*</label>
            <input type="password" />
        </div>
        <div className="create_input">
        <label htmlFor="">Confirm Password*</label>
            <input type="password" />
        </div>

        <button>Save</button>
      </form>
      
    </div>
  )
}

export default Usercreate