import React, { useState } from "react";
import { createProgram } from "../../../services/api/programsApi";
import { useMutation } from "@tanstack/react-query";

const AddProgram = ({ close, refetch }) => {
  const create = useMutation({
    mutationFn: createProgram,
    mutationKey: ["addProgram"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: "",
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
      <div className="px-4">
        <form action="" onSubmit={submitAction}>
          <div className="input">
            <label>Program Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Program Title"
                value={userDetail.firstName}
                required
                onChange={(e) => handleChange("title", e.target.value)}
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
