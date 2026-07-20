import React, { useState } from "react";
import { getCourseContent } from "../../../services/api/programsApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Picker from "../../../Components/Loaders/Picker";
import { IoAddCircle } from "react-icons/io5";
import useModal from "../../../hooks/useModal";
import AddContent from "./Contents/AddContent";
import ContentList from "./Contents/ContentList";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

const CourseContent = ({ id }) => {
  const { role } = useAuth();
  const [page, setPage] = useState(1);
  const route = `course-content/by-course/${id}`;
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getCourseContent(route, page),
    queryKey: ["courseContent", id, page],
    placeholderData: keepPreviousData,
  });
  const { Modal, setShowModal } = useModal();

  const handleNext = () => {
    if (page * PAGE_SIZE >= data?.count) {
      toast.info("This is the last page");
    } else {
      setPage((old) => old + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((old) => old - 1);
    } else {
      toast.info("This is the first page");
    }
  };

  return (
    <>
      <div>
        <div className="mt-12 bg-white shadow-md p-5 rounded">
          <div className="flex items-center justify-between">
            <p className="text-lg lg:text-2xl fw-600">Course Content</p>
            <div
              className="flex items-center gap-x-2 cursor-pointer fw-600 text-primary"
              onClick={() => setShowModal(true)}
            >
              <IoAddCircle className="text-xl" /> Add
            </div>
          </div>
          <div>
            {isLoading && (
              <div className="place-center py-36">
                <Picker size={1.3} />
              </div>
            )}
            {!isLoading && !data?.data?.length && (
              <div className="py-16 place-center">
                <p className="fs-500 fw-600 !syne text-center w-9/12">
                  No Course Content Available
                </p>
              </div>
            )}
            {!isLoading && data && (
              <div>
                <ContentList
                  data={data?.data}
                  courseId={id}
                  refetch={refetch}
                  next={handleNext}
                  prev={handlePrev}
                  page={page}
                  count={data?.count}
                />
              </div>
            )}
          </div>
        </div>
        <Modal title={"Add Course Content"} size={"md"} type={"withCancel"}>
          <AddContent
            id={id}
            close={() => setShowModal(false)}
            refetch={refetch}
          />
        </Modal>
      </div>
    </>
  );
};

export default CourseContent;
