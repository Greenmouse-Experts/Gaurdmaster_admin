import React, { useState, useEffect, useRef } from "react";
import { LuMenu } from "react-icons/lu";
import "../stylesheet/component.css";
import { GoBell } from "react-icons/go";
import user from "../../assets/Ellipse 922.png";
import { Link } from "react-router-dom";

export const Topnav = ({ toggleSidebar }) => {
  const popup = () => {
    setActiveDropdown(!activeDropdown);
  };

  const bellIconRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      bellIconRef.current &&
      !bellIconRef.current.contains(event.target) &&
      !activeDropdown
    ) {
      setActiveDropdown(false);
    }
  };

  // Add click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }; // eslint-disable-next-line
  }, []);

  const datas = [];
  const [activeDropdown, setActiveDropdown] = useState(false);

  return (
    <div className="top_nav">
      <div className="icon_menu">
        <div className="menu-icon" onClick={toggleSidebar}>
          <LuMenu />
        </div>
      </div>

      <div className="icon_menu">
        <div onClick={popup} ref={bellIconRef} className="bell">
         <div className="bell_icon"><GoBell /> 
           <span> 6</span>
         </div>
         
          {activeDropdown && (
            <div className="bell_drop">
              {datas.length > 0 ? (
                datas.data.map((item) => (
                  <div key={item.id}>
                    <div className="add_head">
                      <p>Notification</p>{" "}
                    </div>
                    <div className="bell_body">
                      <GoBell />
                      <div>
                        <h3>
                          {item.body} <span>{item.title}</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  {" "}
                  <div className="add_head">
                    <p>Notification</p>{" "}
                  </div>{" "}
                  <p className="no_body">No Notifications</p>
                </div>
              )}
              <Link to="/notify">View All Notificaton</Link>
            </div>
          )}
        </div>
        <Link to="profile"><img src={user} alt="" /> <p>Admin</p></Link>
        
      </div>
    </div>
  );
};
