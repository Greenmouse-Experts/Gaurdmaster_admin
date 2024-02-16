import React from "react";
import { getCourseContent } from "../../../services/api/programsApi";
import { useQuery } from "@tanstack/react-query";
import Picker from "../../../Components/Loaders/Picker";
import { IoAddCircle } from "react-icons/io5";
import useModal from "../../../hooks/useModal";
import AddContent from "./Contents/AddContent";
import ContentList from "./Contents/ContentList";

const CourseContent = ({ id }) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getCourseContent(id),
    queryKey: ["courseContent"],
  });
  const { Modal, setShowModal } = useModal();
  return (
    <>
      <div>
        <div className="mt-12 bg-white shadow-md p-5 rounded">
          <div className="flex items-center justify-between">
            <p className="text-lg lg:text-2xl fw-600">Course Content</p>
            <div className="flex items-center gap-x-2 cursor-pointer fw-600 text-primary" onClick={() => setShowModal(true)}>
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
                <ContentList data={data?.data} />
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
