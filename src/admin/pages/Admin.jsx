import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import { Topnav } from "../components/Topnav";
import { Route, Routes } from "react-router-dom";
import "../stylesheet/layout.css";
import { adminRoutes } from "../../routes/routes";


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
          <Routes>
          {adminRoutes.map((item) => {
            return (
              <Route path={item.path} element={item.component} key={item.id} />
            );
          })}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
