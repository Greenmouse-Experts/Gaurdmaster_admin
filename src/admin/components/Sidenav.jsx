import React, { useEffect, useRef,useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/wlogo.png";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { BsCalendar4Event,  BsCashCoin } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import "../stylesheet/component.css";
import {  FaUsers, FaUser, FaWallet } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown,IoIosChatbubbles } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { IoSyncSharp } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";

const Sidebar = ({
  showSidebar,
  toggleSidebar,
  setShowMembershipMenu,
  showMembershipMenu,
  setShowEventMenu,
  showEventMenu,
  setShowVerificationMenu,
  showVerificationMenu,
  setShowUsersMenu,
  showUsersMenu,
  showPaymentMenu,
  setshowPaymentMenu,
  showIdMenu,
  setShowIdMenu,
}) => {
  const toggleIdMenu = () => {
    if (showSidebar) {
      setShowIdMenu(!showIdMenu);
      setShowEventMenu(false);
      setShowMembershipMenu(false);
      setShowVerificationMenu(false);
      setShowUsersMenu(false);
      setshowPaymentMenu(false);
    }
  };
  const toggleEventMenu = () => {
    if (showSidebar) {
      setShowEventMenu(!showEventMenu);
      setShowMembershipMenu(false);
      setShowIdMenu(false);
      setShowVerificationMenu(false);
      setShowUsersMenu(false);
      setshowPaymentMenu(false);
    }
  };

  const togglePaymentMenu = () => {
    if (showSidebar) {
      setshowPaymentMenu(!showPaymentMenu);
      setShowEventMenu(false);
      setShowIdMenu(false);
      setShowMembershipMenu(false);
      setShowVerificationMenu(false);
      setShowUsersMenu(false);
    }
  };
  const toggleMembershipMenu = () => {
    if (showSidebar) {
      setShowMembershipMenu(!showMembershipMenu);

      setShowEventMenu(false);
      setShowIdMenu(false);
      setShowVerificationMenu(false);
      setShowUsersMenu(false);
      setshowPaymentMenu(false);
    }
  };

  const toggleVerificationMenu = () => {
    if (showSidebar) {
      setShowVerificationMenu(!showVerificationMenu);
      setShowEventMenu(false);
      setShowIdMenu(false);
      setShowMembershipMenu(false);
      setShowUsersMenu(false);
      setshowPaymentMenu(false);
    }
  };

  const toggleUsersMenu = () => {
    if (showSidebar) {
      setShowUsersMenu(!showUsersMenu);
      setShowEventMenu(false);
      setShowIdMenu(false);
      setShowMembershipMenu(false);
      setShowVerificationMenu(false);
      setshowPaymentMenu(false);
    }
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSidebar && sidebarRef.current && window.innerWidth <= 650) {
        if (!sidebarRef.current.contains(event.target)) {
          toggleSidebar(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar, toggleSidebar]);

  const closeSidebar = () => {
    if (window.innerWidth <= 650) {
      toggleSidebar(false);
    }
  };

  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    setPopup(true);
  };
  
  const {signOut} = useAuth()
  const handlePopup = () => {
    setPopup(false);
  };
  const logout =()=> {
    signOut()
  }
  const {Modal, setShowModal} = useModal()

  return (
    <div
      ref={sidebarRef}
      className={showSidebar ? "sidebar" : "sidebar closed"}
    >
      <div className={showSidebar ? "side_img" : "img-side"}>
        <img className="img-logo" src={'https://res.cloudinary.com/greenmouse-tech/image/upload/v1706278834/rsh/logo2-removebg-preview_fcvxwc.png'} alt="Logo" />{" "}
        <div className="men" onClick={toggleSidebar}>
          <AiOutlineClose />
        </div>
      </div>
      <nav className={`side-nav ${showSidebar ? "active" : ""}`}>
        <ul className="nav-list">
          <div className="nav_">
            <li className="nav-item">
              <NavLink
                onClick={closeSidebar}
                to="/"
                className="nav-lin"
              >
                <LuLayoutDashboard /> {showSidebar && "Dashboard"}
              </NavLink>
            </li>

            <li className="nav-item">
              <span className="nav-link" onClick={toggleUsersMenu}>
                <span className="nav-icon">
                  <span>
                    <FaUser />
                    {showSidebar && "User Management"}
                  </span>
                  {showSidebar &&
                    (showUsersMenu ? (
                      <IoIosArrowUp className="nav-arrow" />
                    ) : (
                      <IoIosArrowDown className="nav-arrow" />
                    ))}
                </span>
                {showUsersMenu && (
                  <div className="nav">
                    <NavLink onClick={closeSidebar} to="/admins">
                      Admin
                    </NavLink>
                    <NavLink onClick={closeSidebar} to="/instructors">
                      Instructors
                    </NavLink>
                    <NavLink to="/students" onClick={closeSidebar}>
                      Students
                    </NavLink>
                  </div>
                )}
              </span>
            </li>
            {/* <li className="nav-item">
              <span onClick={toggleMembershipMenu} className="nav-link">
                <span className="nav-icon">
                  <span>
                    <FaUsers />
                    {showSidebar && "Media Manager"}
                  </span>
                  {showSidebar &&
                    (showMembershipMenu ? (
                      <IoIosArrowUp className="nav-arrow" />
                    ) : (
                      <IoIosArrowDown className="nav-arrow" />
                    ))}
                </span>
                {showMembershipMenu && (
                  <div className="nav">
                    <NavLink onClick={closeSidebar} to="allmember">
                      Add Media
                    </NavLink>
                  </div>
                )}
              </span>
            </li> */}

            <li className="nav-item">
              <span onClick={toggleIdMenu} className="nav-link">
                <span className="nav-icon">
                  <span>
                  <GiBookshelf />
                    {showSidebar && "Courses"}
                  </span>
                  {showSidebar &&
                    (showIdMenu ? (
                      <IoIosArrowUp className="nav-arrow" />
                    ) : (
                      <IoIosArrowDown className="nav-arrow" />
                    ))}
                </span>
                {showIdMenu && (
                  <div className="nav">
                    <NavLink onClick={closeSidebar} to="programs">
                      Programs
                    </NavLink>
                    <NavLink onClick={closeSidebar} to="courses">
                      All Courses
                    </NavLink>
                  </div>
                )}
              </span>
            </li>

            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/pack">
                <span className="nav-icon">
                  <span>
                    <BsCalendar4Event />
                    {showSidebar && "Instructor Package"}
                  </span>
                  
                </span>
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink onClick={closeSidebar} to="/uni"  className="nav-link">
                <span className="nav-icon">
                  <span>
                  <FaWallet />
                    {showSidebar && "Payments"}
                  </span>
                </span>
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink onClick={closeSidebar} to="/uni" className="nav-link">
                <span className="nav-icon">
                  <span>
                  <IoSyncSharp />
                    {showSidebar && "Affiliate Area"}
                  </span>
                </span>
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink onClick={closeSidebar}  to="/uni"className="nav-link">
                <span className="nav-icon">
                  <span>
                  <BsCashCoin />
                    {showSidebar && "Admin Earning"}
                  </span>
                </span>
              </NavLink>
            </li> */}
            <li className="nav-item">
            <NavLink onClick={closeSidebar} to="support" className="nav-link">
              <span className="nav-icon">
                <span>
                <IoIosChatbubbles />
                  {showSidebar && "Support"}
                </span>
              </span>
            </NavLink>
          </li>
            <li className="nav-item">
              <span className="nav-link" onClick={togglePaymentMenu}>
                <span className="nav-icon">
                  <span>
                  <FiSettings />
                    
                    {showSidebar && "Settings"}
                  </span>
                  {showSidebar &&
                    (showPaymentMenu ? (
                      <IoIosArrowUp className="nav-arrow" />
                    ) : (
                      <IoIosArrowDown className="nav-arrow" />
                    ))}
                </span>

                {showPaymentMenu && (
                  <div className="nav">
                    <NavLink onClick={closeSidebar} to="profile">
                      My Profile
                    </NavLink>
                    
                  </div>
                )}
              </span>
            </li>
            
          </div>

          
          <li className="nav-item">
            <span onClick={() => setShowModal(true)} className="nav-link">
              <span className="nav-icon">
                <span>
                  {" "}
                  <FiLogOut /> {showSidebar && "Logout"}
                </span>
              </span>
            </span>
          </li>
        </ul>
      </nav>
      {/* {popup && (
        <div className="popup z-[2000]">
          <div className="modal" onClick={handlePopup}></div>
          <div className="pop_up">
            <div className="pop_head">
              <h3>Are you Sure you want to Logout?</h3>
            </div>
            <div className="pop_btn">
              <button onClick={logout}>Yes</button>
              <button onClick={handlePopup}>No</button>
            </div>
          </div>
        </div>
      )} */}
      <Modal title={''} size={'sm'} >
          <div>
          <div className="">
              <h3 className="text-black fw-500 text-center">Are you Sure you want to Logout?</h3>
            </div>
            <div className="mt-12 flex justify-between px-3">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg" onClick={() => setShowModal(false)}>No</button>
              <button className="bg-primary text-white px-6 py-2 rounded-lg" onClick={logout}>Yes</button>
            </div>
          </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
