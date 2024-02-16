import React from "react";
import "../stylesheet/adminstyles.css";
import { FaPlus } from "react-icons/fa6";
import AdminsList from "../components/users/adminsList";
import useModal from "../../hooks/useModal";
import AddAdmin from "../components/users/addAdmin";
import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../services/api/usersApi";

const AdminManage = () => {
  const {data, refetch} = useQuery({
    queryKey: ['getAdmins'],
    queryFn: getAdmins
})
  const {Modal, setShowModal}= useModal()

  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All Admin</h2>
          <div to="/adduser" className="cursor-pointer" onClick={() => setShowModal(true)}>
            <FaPlus />
            Add New Admin User
          </div>
        </div>
        <div className="card_table">
          <AdminsList data={data}/>
        </div>
      </div>
      <Modal title={'Add New Admin'} size={'lg'} type={'withCancel'}>
        <AddAdmin close={() => setShowModal(false)} refetch={refetch}/>
      </Modal>
    </>
  );
};

export default AdminManage;
