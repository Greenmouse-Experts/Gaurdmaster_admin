import React, { useState } from "react";
import { getPrograms, updateCourse } from "../../../services/api/programsApi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const EditCourse = ({ item, close, refetch }) => {
  const { data } = useQuery({
    queryKey: ["getPrograms"],
    queryFn: getPrograms,
  });
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: item?.title || "",
    shortDesc: item?.shortDesc || "",
    fullDesc: item.fullDesc || "",
    price: item.price || "",
    program: item.program.id || "",
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    updateCourse(item.id, userDetail)
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
            <div className="input">
              <label>Course Program</label>
              <div>
                <select
                  name="program"
                  className="p-[15px] w-full"
                  value={userDetail.program}
                  onChange={(e) => handleChange("program", e.target.value)}
                >
                  <option value=" ">select an option</option>
                  {!!data?.data?.length &&
                    data?.data.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="input">
              <label>Course Price ($)</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter Course Price"
                  value={userDetail.price}
                  required
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Short Description</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Short Description"
                  value={userDetail.shortDesc}
                  required
                  onChange={(e) => handleChange("shortDesc", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="input mt-3">
            <label>Course Description</label>
            <div>
              <textarea
                placeholder="Enter Course Description"
                value={userDetail.fullDesc}
                required
                className="h-24 w-full"
                onChange={(e) => handleChange("fullDesc", e.target.value)}
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

export default EditCourse;
