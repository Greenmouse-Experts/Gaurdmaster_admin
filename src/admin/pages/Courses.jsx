import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCourses } from "../../services/api/programsApi";
import useModal from "../../hooks/useModal";
import AddCourse from "../components/programs/AddCourse";
import CoursesList from "../components/programs/CourseList";
import { FaPlus } from "react-icons/fa";

const Courses = () => {
  const { data, refetch } = useQuery({
    queryKey: ["getCourses"],
    queryFn: getCourses,
  });
  const { Modal, setShowModal } = useModal();

  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All Admin</h2>
          <div to="/adduser" onClick={() => setShowModal(true)}>
            <FaPlus />
            Add New Course
          </div>
        </div>
        <div className="card_table">
          <CoursesList data={data?.data} />
        </div>
      </div>
      <Modal title={"Add New Admin"} size={"md"} type={"withCancel"}>
        <AddCourse close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Courses;
