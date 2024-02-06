import React from "react";
import StudentList from "../components/users/studentList";
import { getStudents } from "../../services/api/usersApi";
import { useQuery } from "@tanstack/react-query";


const Student = () => {
  const {data, refetch} = useQuery({
    queryKey: ['getStudents'],
    queryFn: getStudents
})

  return (
    <div className="adminman">
      <div className="admin_head col">
        <h2>All Students</h2>
        <div>
          {/* <div className="search_input">
            <input type="text" placeholder="Search by name" />
            <span>
              <FiSearch />
            </span>
          </div>
          <p onClick={popup}>
            <FaPlus />
            Add New Student
          </p> */}
        </div>
      </div>

      <div className="card_table student_table">
       <StudentList data={data?.data}/>
      </div>
    </div>
  );
};

export default Student;
