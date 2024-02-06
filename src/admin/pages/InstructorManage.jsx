import React from 'react'
import "../stylesheet/adminstyles.css";
import { FaPlus } from "react-icons/fa6";
import useModal from "../../hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import {  getStuctors } from "../../services/api/usersApi";
import AddInstructor from '../components/users/addStructor';
import InstructorList from '../components/users/structorList';

const InstructorManage = () => {
    const {data, refetch} = useQuery({
        queryKey: ['getStructors'],
        queryFn: getStuctors
    })
      const {Modal, setShowModal}= useModal()
    
      return (
        <>
          <div className="adminman">
            <div className="admin_head">
              <h2>All Instructors</h2>
              <div to="/adduser" onClick={() => setShowModal(true)}>
                <FaPlus />
                Add New Instructor
              </div>
            </div>
            <div className="card_table">
              <InstructorList data={data}/>
            </div>
          </div>
          <Modal title={'Add New Instructor'} size={'lg'} type={'withCancel'}>
            <AddInstructor close={() => setShowModal(false)} refetch={refetch}/>
          </Modal>
        </>
      );
}

export default InstructorManage