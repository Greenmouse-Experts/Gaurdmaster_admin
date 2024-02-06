import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPrograms } from "../../services/api/programsApi";
import useModal from "../../hooks/useModal";
import { FaPlus } from "react-icons/fa6";
import ProgramsList from "../components/programs/ProgramsList";
import AddProgram from "../components/programs/AddProgram";

const Programs = () => {
  const { data, refetch } = useQuery({
    queryKey: ["getPrograms"],
    queryFn: getPrograms,
  });
  const { Modal, setShowModal } = useModal();

  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All Programs</h2>
          <div to="/adduser" onClick={() => setShowModal(true)}>
            <FaPlus />
            Add New Program
          </div>
        </div>
        <div className="card_table">
          <ProgramsList data={data?.data} refetch={refetch} />
        </div>
      </div>
      <Modal title={"Add New Program"} size={"sm"} type={"withCancel"}>
        <AddProgram close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Programs;
