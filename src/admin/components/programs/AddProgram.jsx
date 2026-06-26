import React, { useState } from "react";
import { createProgram } from "../../../services/api/programsApi";
import { uploadImage } from "../../../services/api/routineApi";
import { toast } from "react-toastify";

const AddProgram = ({ close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: "",
    coverImage: "",
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const createWith = (coverImage) => {
    createProgram({ title: userDetail.title, coverImage })
      .then((data) => {
        toast.success(data.message);
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
    if (userDetail.coverImage) {
      const fd = new FormData();
      fd.append("image", userDetail.coverImage);
      uploadImage(fd)
        .then((res) => createWith(res.image))
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Image upload failed");
          setIsBusy(false);
        });
    } else {
      createWith(null);
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
          <div className="mt-12 flex justify-end">
            <button className="btn-primary w-full py-3 fw-500 lg:text-lg">{isBusy? "Submiting..." : "Submit"}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProgram;
