import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCourses } from "../../services/api/programsApi";

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
            Add New Admin User
          </div>
        </div>
        <div className="card_table">
          <AdminsList data={data} />
        </div>
      </div>
      <Modal title={"Add New Admin"} size={"lg"} type={"withCancel"}>
        <AddAdmin close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Courses;
