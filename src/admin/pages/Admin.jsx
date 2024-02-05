import React, { useEffect, useState } from "react";
import Sidenav from "../components/Sidenav";
import { Topnav } from "../components/Topnav";
import { Outlet, useNavigate } from "react-router-dom";
import "../stylesheet/layout.css";


const Dashboard = () => {
  const [showUsersMenu, setShowUsersMenu] = useState(false);
  const [showIdMenu, setShowIdMenu] = useState(false)
  const [showEventMenu, setShowEventMenu] = useState(false);
  const [showMembershipMenu, setShowMembershipMenu] = useState(false);
  const [showVerificationMenu, setShowVerificationMenu] = useState(false);
  const [showPaymentMenu, setshowPaymentMenu] = useState(false)
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 650);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowUsersMenu(false);
    setShowVerificationMenu(false);
    setShowMembershipMenu(false);
    setShowEventMenu(false);
    setShowIdMenu(false)
    setshowPaymentMenu(false)
  };
  const token = localStorage.getItem('guardAdmin_token')
  const navigate = useNavigate()
  // useEffect(() => {
  //   if(!token){
  //     navigate("/login");
  //   }
  // }, [])
  // if (!token) {
  //   return;
  // }

  return (
    <div className="layout">
      <div className="cide">
        <Sidenav
           showEventMenu={showEventMenu}
           setShowEventMenu={setShowEventMenu}
           showMembershipMenu={showMembershipMenu}
           setShowMembershipMenu={setShowMembershipMenu}
           setShowVerificationMenu={setShowVerificationMenu}
          showVerificationMenu={showVerificationMenu}
          setShowUsersMenu={setShowUsersMenu}
          showUsersMenu={showUsersMenu}
          showSidebar={showSidebar}
          showPaymentMenu={showPaymentMenu}
          setshowPaymentMenu={setshowPaymentMenu}
          toggleSidebar={toggleSidebar}
          showIdMenu={showIdMenu}
          setShowIdMenu={setShowIdMenu}
        />
      </div>
      <div className={showSidebar ? "component" : "close-side"}>
        <div>
          <Topnav
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="pages">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
