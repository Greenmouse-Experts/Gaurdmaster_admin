import React from 'react'
import { FiSearch } from "react-icons/fi";

const Support = () => {
    const data =[]
  return (
    <div className="adminman">
    <div className="admin_head col">
      <h2>Support Ticket List</h2>
     
        <div className="search_input">
          <input type="text" placeholder="Search by Subject" />
          <span>
            <FiSearch />
          </span>
        </div>
       
      
    </div>

    <div className="card_table student_table">
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>S/L</th>
              <th>Member</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={user} alt="" />
                </td>
                <td> {item.name}</td>
                <td> {item.email}</td>
                <td>{item.phone}</td>
                <td onClick={() => dotOpen(index)} className="pop_dot">
                  <BsThreeDotsVertical />
                  {dot === index && (
                    <div ref={dotDropdownRef} className="dot_pop">
                      <span>
                        <BiSolidUserDetail />
                        Details
                      </span>
                      
                    </div>
                  )}
                </td>
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
              <th>Member</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Action</th>
              </tr>
            </thead>
          </table>
          <p className='p_line'>No Data Found</p>
        </div>
      )}
    </div>
    
  </div>
  )
}

export default Support