import React, { useState } from "react";
import {
  createProgram,
  updateProgram,
} from "../../../services/api/programsApi";
import { toast } from "react-toastify";

const EditProgram = ({ data, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: data?.title || "",
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    updateProgram(data.id, userDetail)
      .then((data) => {
        toast.success(data.message);
        setIsBusy(false);
        refetch();
        close();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      });
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
