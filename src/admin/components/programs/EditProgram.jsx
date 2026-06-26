import React, { useState } from "react";
import {
  updateProgram,
} from "../../../services/api/programsApi";
import { uploadImage } from "../../../services/api/routineApi";
import { toast } from "react-toastify";

const EditProgram = ({ data, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: data?.title || "",
    // Holds the existing URL (string) or a newly picked File.
    coverImage: data?.coverImage || "",
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const updateWith = (coverImage) => {
    updateProgram(data.id, { title: userDetail.title, coverImage })
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
        refetch();
        close();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
        setIsBusy(false);
      });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    // A newly picked file is an object; an unchanged cover stays a string.
    if (userDetail.coverImage && typeof userDetail.coverImage !== "string") {
      const fd = new FormData();
      fd.append("image", userDetail.coverImage);
      uploadImage(fd)
        .then((res) => updateWith(res.image))
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Image upload failed");
          setIsBusy(false);
        });
    } else {
      updateWith(userDetail.coverImage || null);
    }
  };
  return (
    <>
      <div className="px-4">
        <form action="" onSubmit={submitAction}>
          <div className="input">
            <label>Program Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Program Title"
                value={userDetail.title}
                required
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="input mt-4">
            <label>Cover Image</label>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange("coverImage", e.target.files[0])}
              />
            </div>
          </div>
          {data?.coverImage && (
            <div className="mt-3">
              <p className="text-sm text-gray-500">Current cover</p>
              <img
                src={data.coverImage}
                alt="cover"
                className="mt-1 w-28 h-20 object-cover rounded"
              />
            </div>
          )}
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

export default EditProgram;
