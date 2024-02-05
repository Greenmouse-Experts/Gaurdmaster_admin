import React from "react";
import Home from "../admin/pages/Home";
import Profile from "../admin/pages/Profile";
import AdminManage from "../admin/pages/AdminManage";
import Usercreate from "../admin/pages/Usercreate";

export const adminRoutes = [
  {
    id: "1",
    path: "/",
    component: <Home/>,
  },
  {
    id: "2",
    path: "profile",
    component: <Profile/>,
  },
  {
    id: "3",
    path: "admins",
    component: <AdminManage/>,
  },{
    id: "4",
    path: "adduser",
    component: <Usercreate/>,
  },
];
