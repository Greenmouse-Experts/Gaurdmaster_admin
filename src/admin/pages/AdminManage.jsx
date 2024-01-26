import React from 'react'
import "../stylesheet/adminstyles.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const AdminManage = () => {
    const data = []

  return (
    <div className="adminman">
        <div className="admin_head">
            <h2>User Create</h2>
            <Link to="/admin/admins"><FaPlus /> Show All User</Link>
        </div>

        <div className="card_table">
           {data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>S/L</th>
                  <th>Name</th>
                  <th>Action</th>
                
                  
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>Name: {item.name} <br />
                    Email: {item.email}
                    </td>
                    <td>{item.phone}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="cart_table">
                <table>
            <thead>
              <tr>
              <th>S/L</th>
                  <th>Name</th>
                  <th>Action</th>
                
              </tr>
            </thead>
            
          </table>
            <p>No Registered Admin</p>
            </div>
            
          )}
     </div>
        
     
    </div>
  )
}

export default AdminManage

