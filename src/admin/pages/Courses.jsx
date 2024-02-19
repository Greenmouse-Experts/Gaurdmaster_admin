import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCourses } from "../../services/api/programsApi";
import useModal from "../../hooks/useModal";
import AddCourse from "../components/programs/AddCourse";
import CoursesList from "../components/programs/CourseList";
import { FaPlus } from "react-icons/fa";

const Courses = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCourses"],
    queryFn: getCourses,
  });
  const { Modal, setShowModal } = useModal();

  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All Courses</h2>
          <div to="/adduser" className="cursor-pointer" onClick={() => setShowModal(true)}>
            <FaPlus />
            Add New Course
          </div>
        </div>
        <div className="card_table">
          <CoursesList data={data?.data} isLoading={isLoading} refetch={refetch}/>
        </div>
      </div>
      <Modal title={"Add New Admin"} size={"lg"} type={"withCancel"}>
        <AddCourse close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Courses;
