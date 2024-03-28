import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { viewSingleSubContent } from "../../../../services/api/programsApi";
import Picker from "../../../../Components/Loaders/Picker";
import AssessmentQuestions from "./accessmentQuestions";

const ViewAssessment = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => viewSingleSubContent(id),
    queryKey: ["singleContentSub"],
  });
  const navigate = useNavigate();
  return (
    <div className="mt-4 lg:mt-6">
      <div>
        {isLoading && (
          <div className="place-center py-36">
            <Picker size={1.7} />
          </div>
        )}
      </div>
      <div>
        {!isLoading && data && (
          <div className="grid gap-2 bg-blue-50 shadow p-6">
            <div className="flex lg:gap-x-2">
              <p className="whitespace-nowrap">Course Title:</p>
              <p className="fw-500">{data?.course?.title}</p>
            </div>
            <div className="flex lg:gap-x-2">
              <p className="whitespace-nowrap">Course Sub Title:</p>
              <p className="fw-500">{data?.courseContent?.title}</p>
            </div>
            <div className="flex lg:gap-x-2">
              <p className="whitespace-nowrap">Assessment Title:</p>
              <p className="fw-500">{data?.title}</p>
            </div>
            <div className="flex lg:gap-x-2">
              <p className="whitespace-nowrap">Duration:</p>
              <p className="fw-500">{data?.duration} mins</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 lg:mt-12">
        <AssessmentQuestions id={id} courseId={data?.course?.id} subId={data?.courseContent?.id} />
      </div>
    </div>
  );
};

export default ViewAssessment;
