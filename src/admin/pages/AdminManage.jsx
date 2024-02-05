import React from "react";
import "../stylesheet/adminstyles.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import AdminsList from "../components/users/adminsList";

const AdminManage = () => {
  const data = [];

  return (
    <div className="adminman">
      <div className="admin_head">
        <h2>All Admin</h2>
        <Link to="/adduser">
          <FaPlus />
          Add New Admin User
        </Link>
      </div>

      <div className="card_table">
        <AdminsList/>
      </div>
    </div>
  );
};

export default AdminManage;
