import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { viewSubContent } from "../../../../services/api/programsApi";
import useModal from "../../../../hooks/useModal";
import CreateSubContent from "./CreateSubContent";
import ViewSubcontent from "../Subcontent/ViewSubcontent";

const SubContent = ({ id, courseId }) => {
  const [data, setData] = useState([])
  const getData = async(id) => {
      await viewSubContent(id)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getData(id)
  }, [id])
  const {Modal, setShowModal} = useModal()
  const {Modal:View, setShowModal:ShowView} = useModal()
  const [selected, setSelected] = useState('')
  const openDetails = (item) => {
    setSelected(item)
    ShowView(true)
  }
  return (
    <div className="!syne">
      <div
        className="flex items-center gap-x-2 cursor-pointer fw-600 text-primary !syne"
        onClick={() => setShowModal(true)}
      >
        <IoAddCircle className="text-xl" /> Add SubContent
      </div>
      <div className="mt-4 grid gap-3">
        {
          !!data?.length && data.map((item) => (
            <div className="flex justify-between items-center shadow p-2 rounded" onClick={() => openDetails(item.id)}>
              <div className="flex gap-x-2">
              <span className="w-3 h-3 circle mt-2 bg-primary"></span>
              <p className="fs-600">{item.title}</p>
              </div>
              <div>
                <p>{item.duration} Min(s)</p>
              </div>
            </div>
          ))
        }
      </div>
        <Modal title={'Add Sub Content'} size={'lg'} type={'withCancel'}>
            <CreateSubContent id={id} courseId={courseId} close={() => setShowModal(false)} refetch={() => getData(id)}/>
        </Modal>
        <View title={'Course Sub Content'} size={'lg'} type={'withCancel'}>
          <ViewSubcontent id={selected}/>
        </View>
    </div>
  );
};

export default SubContent;
