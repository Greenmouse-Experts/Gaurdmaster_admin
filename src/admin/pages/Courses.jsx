import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCourses } from "../../services/api/programsApi";
import useModal from "../../hooks/useModal";
import AddCourse from "../components/programs/AddCourse";
import CoursesList from "../components/programs/CourseList";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const Courses = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCourses", page],
    queryFn: () => getCourses(page),
    placeholderData: keepPreviousData,
  });
  const { Modal, setShowModal } = useModal();
  const handleNext = () => {
    if(page){
      setPage((old) => old + 1)
    }else{
      toast.info('This is the first page')
    }
  }
  const handlePrev = () => {
    if(page > 1){
      setPage((old) => old - 1)
    }else{
      toast.info('This is the last page')
    }
  }

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
          <CoursesList data={data?.data} isLoading={isLoading} refetch={refetch} next={handleNext} prev={handlePrev} page={page} count={data?.count}/>
        </div>
      </div>
      <Modal title={"Add New Course"} size={"lg"} type={"withCancel"}>
        <AddCourse close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Courses;
