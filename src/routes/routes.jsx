import React from "react";
import Home from "../admin/pages/Home";
import Profile from "../admin/pages/Profile";

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
];
