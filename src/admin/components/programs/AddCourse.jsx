import React, { useState } from "react";
import { createCourse } from "../../../services/api/programsApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const AddCourse = ({ close, refetch }) => {
  const create = useMutation({
    mutationFn: createCourse,
    mutationKey: ["addCourse"],
  });
  const { data } = useQuery({
    queryKey: ["getPrograms"],
    queryFn: getPrograms,
  });
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    price: "",
    program: ""
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
          <div className="grid gap-5 lg:grid-cols-2">
          <div className="input">
            <label>Course Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Course Title"
                value={userDetail.title}
                required
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
          </div>
          </div>
          <div className="input">
            <label>Course Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Course Title"
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

export default AddCourse;
