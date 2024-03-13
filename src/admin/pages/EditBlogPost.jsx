import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost } from "../../services/api/blogApi";
import Picker from "../../Components/Loaders/Picker";
import dayjs from "dayjs";
import { BiEdit } from "react-icons/bi";
import { TbArrowBackUp } from "react-icons/tb";
import useDialog from "../../hooks/useDialog";
import EditBlog from "../components/blog/EditBlog";

const EditBlogPost = () => {
  const { id } = useParams();
  const [showState, setShowState] = useState(1)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchSinglePost"],
    queryFn: () => getSinglePost(id),
  });
  const navigate = useNavigate()
  return (
    <div>
      <div>
        <div className="mb-2">
            <TbArrowBackUp className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
        </div>
        {isLoading && (
          <div className="place-center py-36">
            <Picker size={1.7} />
          </div>
        )}
        {(!isLoading && data) && (
          showState === 1 && (<div className="relative">
            <div>
              <p className="text-2xl fw-600">{data?.title}</p>
              <p className="mt-2 !syne fs-500">
                {dayjs(data?.createdDate).format("dddd DD, MMMM YYYY")}
              </p>
              <div className="flex gap-x-2">
                <p className="!syne">Published By:</p>
                <p className="!syne">{`${data?.user.firstName} ${data?.user.lastName}`}</p>
              </div>
              <div className="flex mt-2">
                {data.tags.map((item) => <p className="px-2 py-[2px] fs-300 rounded-xl bg-blue-200">{item.tag}</p>)}
              </div>
            </div>
            <div className="mt-3">
              <img
                src={data?.coverImage}
                alt="image"
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className="mt-7">
              <p className="whitespace-pre-line">{data.description}</p>
            </div>
            <div className="absolute top-5 right-2 flex gap-x-2 items-center cursor-pointer px-5 py-2 border border-gray-600 rounded-lg" onClick={() => setShowState(2)}>
              <BiEdit />
              Edit
            </div>
          </div>)
        )}
        {showState === 2 && (<EditBlog item={data} refetch={refetch} close={() => setShowState(1)}/>) }
      </div>
    </div>
  );
};

export default EditBlogPost;
