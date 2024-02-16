import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getSingleCourse } from "../../services/api/programsApi";
import Picker from "../../Components/Loaders/Picker";
import CourseContent from "../components/programs/CourseContent";
import dayjs from "dayjs";

const CourseDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => getSingleCourse(id),
    queryKey: ["singleCourse"],
  });
  return (
    <>
      <div>
        {isLoading && (
          <div className="place-center py-36">
            <Picker size={1.8} />
          </div>
        )}
        {data && !isLoading && (
          <div>
            <div>
              <div>
                <p className="fs-300 fw-500 text-gray-600">{dayjs(data.createdDate).format('DD MMMM YYYY')}</p>
                <p className="fs-500 lg:text-xl fw-600 text-gray-600">
                 {data?.program.title}
                </p>
                <p className="text-xl lg:text-3xl fw-600">
                    {data.title}
                </p>
                <p className="mt-2 fs-300 !syne">{data.fullDesc}</p>
                <div className="mt-3 flex gap-x-1 items-center">
                    <p className="fs-300 fw-500 text-gray-600">Last Updated:</p>
                    <p className="fs-300 fw-600 text-gray-600">{dayjs(data.updatedDate).format('hh:mma DD MMMM YYYY')}</p>
                </div>
              </div>
              <div className="mt-6 grid lg:grid-cols-3 bg-gray-50 w-full shadow-md lg:p-8 p-4 rounded-lg lg:mr-3">
                <div className="flex gap-x-2">
                  <div className="w-12 h-12 circle bg-primary"></div>
                  <div>
                    <p className="text-gray-500 fw-500">Instructor</p>
                    <p className="fw-500">{`${data.instructor.firstName} ${data.instructor.lastName}`}</p>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <div className="w-12 h-12 circle bg-primary"></div>
                  <div>
                    <p className="text-gray-500 fw-500">Course Duration</p>
                    <p className="fw-500">120 mins</p>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <div className="w-12 h-12 circle bg-primary"></div>
                  <div>
                    <p className="text-gray-500 fw-500">Course Price</p>
                    <p className="fw-500">${data.price},00</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <CourseContent id={id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetails;
