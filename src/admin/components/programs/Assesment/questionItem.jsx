import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import useDialog from "../../../../hooks/useDialog";
import ReusableModal from "../../../../Components/ReusableModal";
import { deleteQuestion } from "../../../../services/api/programsApi";
import { toast } from "react-toastify";
import EditQuestion from "./editQuestion";

const QuestionItem = ({ data, i, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog: Edit, setShowModal: showEdit } = useDialog();
  const { Dialog: Delete, setShowModal: showDelete } = useDialog();
  const deleteThisQuestion = async () => {
    setIsBusy(true);
    await deleteQuestion(data?.id)
      .then((res) => {
        toast.success(res.message);
        refetch()
        showDelete(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setIsBusy(false);
        showDelete(false);
      });
  };
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="flex gap-x-2 items-center">
            {data?.isPublished ? (
              <p className="text-green-700 fw-500 fs-400 bg-green-50 border border-green-800 rounded px-3">
                Active
              </p>
            ) : (
              <p className="text-gray-700 fw-500 fs-400 bg-gray-50 border border-gray-800 rounded px-3">
                Inactive
              </p>
            )}
            <FaRegEdit className="text-xl lg:text-2xl cursor-pointer" onClick={() => showEdit(true)}/>
            <RiDeleteBinFill className="text-xl lg:text-2xl cursor-pointer text-red-600" onClick={() => showDelete(true)}/>
          </div>
          <div>
          <p className="fw-500">
            {i + 1}. {data?.question}
          </p>
          <p className="pl-3 fs-500 fw-500">({data?.point} point(s))</p>
          </div>
        </div>
        <div className="mt-2 grid gap-2">
          {data?.options?.map((item, i) => (
            <div className="flex gap-x-2 items-center" key={i}>
              <input type="radio" disabled className="w-4 h-4" />
              <label>{item}</label>
              {i === data.correctOption && (
                <span className="fw-500 text-green-600 fs-300 pl-3">
                  Correct Answer
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <Edit title={"Edit Assessment Question"} size={"2xl"}>
        <EditQuestion data={data} refetch={refetch} close={() => showEdit(false)}/>
      </Edit>
      <Delete title={"Delete Assessment Question"} size={"sm"}>
        <ReusableModal
          title={"Are you sure you want to delete this question"}
          action={() => deleteThisQuestion()}
          closeModal={() => showDelete(false)}
          cancelTitle={"Close"}
          actionTitle={"Yes, Delete"}
          isBusy={isBusy}
        />
      </Delete>
    </div>
  );
};

export default QuestionItem;
