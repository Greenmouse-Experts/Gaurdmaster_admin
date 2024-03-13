import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { createBlogTag } from "../../../services/api/blogApi";
import { toast } from "react-toastify";

const AddTag = ({ close, refetch }) => {
  const create = useMutation({
    mutationFn: createBlogTag,
    mutationKey: ["createTag"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    tag: "",
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    if (userDetail.password !== userDetail.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    setIsBusy(true);
    create.mutate(userDetail, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsBusy(false);
        refetch();
        close();
      },
      onError: (error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <>
      <div className="">
        <form action="" onSubmit={submitAction}>
          <div className="input">
            <label>Tag Name</label>
            <div>
              <input
                type="text"
                placeholder="Enter Program Title"
                value={userDetail.tag}
                required
                onChange={(e) => handleChange("tag", e.target.value)}
              />
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <button className="btn-primary w-full py-3 fw-500 lg:text-lg">
              {isBusy ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTag;
