import React from "react";
import "../stylesheet/layout.css";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
// import { Chart as chartjs } from "chart.js/auto";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import logo from "../../assets/profile.png";
import { PiStudentBold } from "react-icons/pi";

const Home = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Data",
        data: [2, 11, 20, 15, 25, 30, 18, 22, 16, 28, 12, 24], // Replace these values with your data
        backgroundColor: [
          "#192F59"
        ], 
        borderColor: [
          "#192F59"
        ],// Bar colors
        fill: {
        target: 'origin',
        above: '#192f5942',   // Area will be red above the origin
        below: '#192f5942'    // And blue below the origin
      }
      },
      
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="homes">
      <div className="top_home">
        <div className="homes_head">
          <h2>Revenue</h2>
          <div className="rev">
            <div>
              <div>
                <h3>Courses</h3>
                <p>30</p>
              </div>

              <span>
                <GiBookshelf />
              </span>
            </div>
            <div>
              <div>
                <h3>Enrollment</h3>
                <p>100</p>
              </div>
              <span><PiStudentBold /></span>
            </div>
            <div>
              <div>
                <h3>Instructors</h3>
                <p>20</p>
              </div>

              <span><FaUserCheck /></span>
            </div>
            <div>
              <div>
                <h3>Students</h3>
                <p>120</p>
              </div>
              <span>
                <FaUsers />
              </span>
            </div>
          </div>
        </div>

        <div className="inst">
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
        </div>
      </div>

      <div className="home_bottoms">
        <div className="bar_admin">
          <h2>This Year Revenue</h2>
          <div className="bar_div">
            {/* <Line
              data={data}
              options={options}
              style={{ width: "inherit", height: "100%" }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )                       
};

export default Home;
