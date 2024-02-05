import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import user from "../../assets/user.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidUserDetail } from "react-icons/bi";
import { GiBookshelf } from "react-icons/gi";
import Popup from "../components/Popup";
import { useNavigate } from "react-router-dom";
import Create from "../components/Create";


const Student = () => {
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);const [create, setCreate] = useState(false)
  const [dot, setDot] = useState(false);
  const dotDropdownRef = useRef(null);

  const dotOpen = (index) => {
    setDot(index === dot ? null : index);
  };

  
const popup = () => {
  setCreate(!create)
}

const popclose = () => {
  setCreate(false)
}

  const handleAddMemberClick = () => {
    setShowAddMemberPopup(true);
  };

  const handleCloseAddMemberPopup = () => {
    setShowAddMemberPopup(false);
  };
  const handleClickOutsideDot = (event) => {
    if (
      dotDropdownRef.current &&
      !dotDropdownRef.current.contains(event.target)
    ) {
      setDot(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDot);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDot);
    };
  }, []);
  const data = [
    {
      id: 1,
      image: user,
      name: "Jeff Epstien",
      email: "jeffepstien@gmail.com",
      phone: "07023790729",
    },
    {
      id: 2,
      image: user,
      name: "Jeff Epstien",
      email: "jeffepstien@gmail.com",
      phone: "07023790729",
    },
  ];

  const navigate = useNavigate()
  const open = ()=> {
    navigate("/studentdetails")
  }

  return (
    <div className="adminman">
      <div className="admin_head col">
        <h2>All Students</h2>
        <div>
          <div className="search_input">
            <input type="text" placeholder="Search by name" />
            <span>
              <FiSearch />
            </span>
          </div>
          <p onClick={popup}>
            <FaPlus />
            Add New Student
          </p>
        </div>
      </div>

      <div className="card_table student_table">
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S/L</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
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
                        <span onClick={open}>
                          <BiSolidUserDetail />
                          Details
                        </span>
                        <span onClick={handleAddMemberClick}>
                          <GiBookshelf /> Courses
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
            <p>No Registered Student</p>
          </div>
        )}
      </div>
      {create && (
        <div className="popup">
        <div className="modal" onClick={popclose}></div>
        <Create onClose={popclose} />
      </div>
      )}
      {showAddMemberPopup && (
        <div className="popup">
          <div className="modal" onClick={handleCloseAddMemberPopup}></div>
          <Popup onClose={handleCloseAddMemberPopup} />
        </div>
      )}
    </div>
  );
};

export default Student;
