import React, { useState } from "react";
import { createCourse, getPrograms } from "../../../services/api/programsApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadImage } from "../../../services/api/routineApi";
import useAuth from "../../../hooks/useAuth";

const AddCourse = ({ close, refetch }) => {
  const {role} = useAuth()
  const create = useMutation({
    mutationFn: createCourse,
    mutationKey: ["addCourse"],
  });
  const route = role === "admin"? "programs" : "programs/fetch-programs"
  const { data } = useQuery({
    queryKey: ["getPrograms"],
    queryFn: () => getPrograms(route),
  });
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    price: "",
    discount: "",
    program: "",
    coverImg: ""
  });
  const [outcomes, setOutcomes] = useState([{ description: "", order: 1 }]);

  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };

  const addOutcome = () => {
    setOutcomes([...outcomes, { description: "", order: outcomes.length + 1 }]);
  };
  const removeOutcome = (index) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };
  const handleOutcomeChange = (index, field, value) => {
    const updated = outcomes.map((o, i) =>
      i === index ? { ...o, [field]: field === "order" ? Number(value) : value } : o
    );
    setOutcomes(updated);
  };
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        ...userDetail,
        price: Number(userDetail.price),
        discount: Number(userDetail.discount) || 0,
        coverImage: data.image,
        previewUrl: null,
        outcomes,
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
            <div className="input">
              <label>Discount (%)</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter Discount"
                  min={0}
                  max={100}
                  value={userDetail.discount}
                  onChange={(e) => handleChange("discount", e.target.value)}
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
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="fw-500">Learning Outcomes</label>
              <button
                type="button"
                onClick={addOutcome}
                className="text-sm text-primary fw-500 underline"
              >
                + Add Outcome
              </button>
            </div>
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex gap-2 items-start mb-2">
                <div className="input flex-1">
                  <div>
                    <input
                      type="text"
                      placeholder="Outcome description"
                      value={outcome.description}
                      required
                      onChange={(e) =>
                        handleOutcomeChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="input w-20 shrink-0">
                  <div>
                    <input
                      type="number"
                      placeholder="Order"
                      min={1}
                      value={outcome.order}
                      onChange={(e) =>
                        handleOutcomeChange(index, "order", e.target.value)
                      }
                    />
                  </div>
                </div>
                {outcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOutcome(index)}
                    className="mt-2 text-red-500 fw-500 text-lg leading-none"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
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
