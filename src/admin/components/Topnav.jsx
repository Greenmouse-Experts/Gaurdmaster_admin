import React, { useState, useEffect, useRef } from "react";
import { LuMenu } from "react-icons/lu";
import "../stylesheet/component.css";
import { GoBell } from "react-icons/go";
import user from "../../assets/Ellipse 922.png";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsGear } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { getNotify } from "../../services/api/routineApi";

export const Topnav = ({ toggleSidebar }) => {
  const popup = () => {
    setActiveDropdown(!activeDropdown);
  };
  const navigate = useNavigate();
  const { user: admin } = useAuth();

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
  const { signOut } = useAuth();
  const logout = () => {
    signOut();
  };
  const { Modal, setShowModal } = useModal();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notify"],
    queryFn: () => getNotify(admin.role),
  });
  return (
    <>
      <div className="top_nav">
        <div className="icon_menu">
          <div className="menu-icon" onClick={toggleSidebar}>
            <LuMenu />
          </div>
        </div>

        <div className="icon_menu">
          <div onClick={popup} ref={bellIconRef} className="bell">
            <div className="bell_icon cursor-pointer">
              <GoBell />
              <span>{data?.data?.length}</span>
            </div>

            {activeDropdown && (
              <div className="bell_drop">
                {data?.data?.length > 0 ? (
                  <div>
                    <div className="add_head">
                      <p>Notification</p>{" "}
                    </div>
                    {data?.data?.slice(0,4).map((item) => (
                      <div key={item.id}>
                        <div className="bell_body">
                          <GoBell className="shrink-0"/>
                          <div>
                            <h3 className="!fs-500">{item.body}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button className="p-0 m-0 bg-transparent hover:shadow-none outline-none !shadow-none">
                <div className="flex items-center !gap-x-2">
                  <img
                    src={admin.image ? admin.image : user}
                    alt="profile"
                    className="lg:!w-12 lg:!h-12"
                  />
                  <div className="flex gap-x-2 items-center">
                    <p>
                      {admin.firstName} {admin.lastName}
                    </p>
                    <RiArrowDropDownLine className="cursor-pointer text-[#FFC000] text-3xl" />
                  </div>
                </div>
              </Button>
            </MenuHandler>
            <MenuList className="index-30 text-black w-44">
              <MenuItem
                className="flex gap-x-2 items-center fw-500"
                onClick={() => navigate("/profile")}
              >
                <BsGear className="text-2xl" />
                Settings
              </MenuItem>
              <MenuItem
                className="flex gap-x-2 items-center fw-500"
                onClick={() => setShowModal(true)}
              >
                <IoLogOutOutline className="text-2xl" />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <Modal title={""} size={"sm"}>
        <div>
          <div className="">
            <h3 className="text-black fw-500 text-center">
              Are you Sure you want to Logout?
            </h3>
          </div>
          <div className="mt-12 flex justify-between px-3">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              No
            </button>
            <button
              className="bg-primary text-white px-6 py-2 rounded-lg"
              onClick={logout}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
