import React, { useState } from "react";
import { createCourse, getPrograms } from "../../../services/api/programsApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadImage } from "../../../services/api/routineApi";

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
    program: "",
    coverImg: ""
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        ...userDetail,
        price: Number(userDetail.price),
        coverImage: data.image
        // previewUrl: data.image
      };
      create.mutate(payload, {
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
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    // const payload = {
    //   ...userDetail,
    //   price: Number(userDetail.price)
    // }
    const fd = new FormData()
    fd.append('image', userDetail.coverImg)
    mutation.mutate(fd)
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
            <label>Cover Image</label>
            <div>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleChange("coverImg", e.target.files[0])}
              />
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

export default AddCourse;
