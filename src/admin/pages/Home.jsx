import React from "react";
import "../stylesheet/layout.css";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import logo from "../../assets/profile.png";
import { PiStudentBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../services/api/authApi";
import RevenueChart from "../components/dashboard/RevenueChart";

const Home = () => {
  const query = useQuery({
    queryKey: ["revenue"],
    queryFn: async () => {
      let resp = await apiClient.get("/orders/admin-analytics");
      return resp.data;
    },
  });

  const analytics = query.data || {};

  return (
    <div className="homes">
      <div className="">
        <div className="w-full">
          <h2>Revenue</h2>
          <div className="rev grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100 ">
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">Courses</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {analytics.courses ?? 0}
                </h3>
              </div>
              <span className="bg-[#1a2744] text-white text-3xl p-4 rounded-xl flex items-center justify-center">
                <GiBookshelf />
              </span>
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Enrollment</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {analytics.enrollment ?? 0}
                </h3>
              </div>
              <span className="bg-[#1a2744] text-white text-3xl p-4 rounded-xl flex items-center justify-center">
                <PiStudentBold />
              </span>
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Instructors</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {analytics.instructors ?? 0}
                </h3>
              </div>
              <span className="bg-[#1a2744] text-white text-3xl p-4 rounded-xl flex items-center justify-center">
                <FaUserCheck />
              </span>
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Students</p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {analytics.students ?? 0}
                </h3>
              </div>
              <span className="bg-[#1a2744] text-white text-3xl p-4 rounded-xl flex items-center justify-center">
                <FaUsers />
              </span>
            </div>
          </div>
        </div>

        {/* <div className="inst">
          <h2>Top Instructor</h2>

          <div>
            <img src={logo} alt="" />

            <div className="inst_name">
              <h3>Victor</h3>
              <p>Instructor@gmail.com</p>
              <span>Details</span>
            </div>

            <div className="cs">
              <div>
                <p>10</p>
                <span>Course</span>
              </div>

              <div>
                <p>59</p>
                <span>Student</span>
              </div>
            </div>
          </div>
        </div>*/}
      </div>

      <div className="home_bottoms">
        <RevenueChart />
      </div>
    </div>
  );
};

export default Home;
