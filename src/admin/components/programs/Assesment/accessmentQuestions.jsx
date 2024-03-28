import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAssessmentQuestions } from "../../../../services/api/programsApi";
import { TbMessageQuestion } from "react-icons/tb";
import { EmptyData } from "../../../../Components/empty/emptyStates";
import { MdAddCircleOutline } from "react-icons/md";
import useDialog from "../../../../hooks/useDialog";
import AddQuestion from "./addQuestion";
import QuestionItem from "./questionItem";

const AssessmentQuestions = ({ id, courseId, subId }) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getAssessmentQuestions(id),
    queryKey: ["getQuestions"],
  });
  const { Dialog, setShowModal } = useDialog();
  const arrangeArr = (item) => {
   const newArr = item.reverse();
   return newArr
  }
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <TbMessageQuestion className="text-xl" />
            <p className="!syne text-2xl fw-500">Assessment Questions</p>
          </div>
          <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <MdAddCircleOutline className="text-lg" />
            <p className="!syne underline fw-500">Add Question</p>
          </div>
        </div>
        <div className="bg-white mt-2 shadow">
          {!isLoading && !data?.data.length && (
            <div className="py-6">
              <EmptyData
                size={200}
                msg={"There are no set questions currently"}
              />
            </div>
          )}
          <div className="p-5 grid gap-6">
            {
                (!isLoading && !!data?.data.length) && (
                   arrangeArr(data?.data)?.map((item, i) => (
                    <QuestionItem data={item} refetch={refetch} i={i} key={item.id}/>
                   ))
                )
            }
          </div>
        </div>
      </div>
      <Dialog title={"Add New Question"} size={"2xl"}>
        <AddQuestion
          id={id}
          subId={subId}
          courseId={courseId}
          refetch={refetch}
          close={() => setShowModal(false)}
        />
      </Dialog>
    </div>
  );
};

export default AssessmentQuestions;
