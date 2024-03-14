import React from "react";
import { useQuery } from "@tanstack/react-query";
import useDialog from "../../hooks/useDialog";
import { FaPlus } from "react-icons/fa";
import TagList from "../components/blog/TagList";
import { getBlogTags } from "../../services/api/blogApi";
import AddTag from "../components/blog/AddTag";

const BlogTags = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getBlogTags"],
    queryFn: getBlogTags,
  });
  const { Dialog, setShowModal } = useDialog();

  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All Blog Tags</h2>
          <div className="cursor-pointer" onClick={() => setShowModal(true)}>
            <FaPlus />
            Add New Tag
          </div>
        </div>
        <div className="card_table">
          <TagList data={data} isLoading={isLoading} refetch={refetch} />
        </div>
      </div>
      <Dialog title={"Add New Tag"} size={"lg"} type={"withCancel"}>
        <AddTag close={() => setShowModal(false)} refetch={refetch} />
      </Dialog>
    </>
  );
};

export default BlogTags;
