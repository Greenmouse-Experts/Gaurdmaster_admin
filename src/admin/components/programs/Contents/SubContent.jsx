import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IoAddCircle } from "react-icons/io5";
import { viewSubContent } from "../../../../services/api/programsApi";
import useModal from "../../../../hooks/useModal";
import CreateSubContent from "./CreateSubContent";

const SubContent = ({ id, courseId }) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => viewSubContent(id),
    queryKey: ["subContent"],
  });
  const {Modal, setShowModal} = useModal()
  return (
    <div className="!syne">
      <div
        className="flex items-center gap-x-2 cursor-pointer fw-600 text-primary !syne"
        onClick={() => setShowModal(true)}
      >
        <IoAddCircle className="text-xl" /> Add SubContent
      </div>
      <div></div>
        <Modal title={'Add Sub Content'} size={'lg'} type={'withCancel'}>
            <CreateSubContent id={id} courseId={courseId} close={() => setShowModal(false)} refetch={refetch}/>
        </Modal>
    </div>
  );
};

export default SubContent;
