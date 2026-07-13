import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getPrograms, updateCourse } from "../../../services/api/programsApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadImage } from "../../../services/api/routineApi";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const EditCourse = ({ item, close, refetch }) => {
  const { role } = useAuth();
  const progRoute = role === "admin" ? "programs" : "programs/fetch-programs";
  const { data } = useQuery({
    queryKey: ["getPrograms"],
    queryFn: () => getPrograms(progRoute),
  });

  const [isBusy, setIsBusy] = useState(false);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: item?.title || "",
      shortDesc: item?.shortDesc || "",
      fullDesc: item?.fullDesc || "",
      price: Number(item?.price) || "",
      discount: item?.discount || "",
      program: item?.program?.id || "",
      outcomes: item?.courseOutcomes?.length
        ? item.courseOutcomes.map((o) => ({
            description: o.description,
            order: o.order,
          }))
        : [{ description: "", order: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "outcomes",
  });

  const [coverImg, setCoverImg] = useState(null);

  const submit = (values) => {
    setIsBusy(true);
    const buildPayload = (coverImage) => ({
      title: values.title,
      shortDesc: values.shortDesc,
      fullDesc: values.fullDesc,
      price: Number(values.price),
      discount: Number(values.discount) || 0,
      program: values.program,
      outcomes: values.outcomes.map((o) => ({
        description: o.description,
        order: Number(o.order),
      })),
      ...(coverImage ? { coverImage } : {}),
    });

    const route =
      role === "admin"
        ? `/courses/${item.id}`
        : `/courses/instructor/${item.id}`;

    if (coverImg) {
      const fd = new FormData();
      fd.append("image", coverImg);
      uploadImageMutation.mutate(fd, {
        onSuccess: (data) => {
          updateCourse(route, buildPayload(data.image))
            .then((res) => {
              toast.success(res.message);
              setIsBusy(false);
              refetch();
              close();
            })
            .catch((err) => {
              toast.error(
                err.response?.data?.message || "Something went wrong",
              );
              setIsBusy(false);
            });
        },
        onError: () => {
          toast.error("Image upload failed");
          setIsBusy(false);
        },
      });
    } else {
      updateCourse(route, buildPayload())
        .then((res) => {
          toast.success(res.message);
          setIsBusy(false);
          refetch();
          close();
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Something went wrong");
          setIsBusy(false);
        });
    }
  };

  const uploadImageMutation = useMutation({ mutationFn: uploadImage });

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="input">
            <label>Course Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Course Title"
                required
                {...register("title")}
              />
            </div>
          </div>
          <div className="input">
            <label>Course Program</label>
            <div>
              <select
                name="program"
                className="p-[15px] w-full"
                {...register("program")}
              >
                <option value="">Select an option</option>
                {!!data?.data?.length &&
                  data.data.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.title}
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
                required
                {...register("price")}
              />
            </div>
          </div>
          <div className="input">
            <label>Short Description</label>
            <div>
              <input
                type="text"
                placeholder="Enter Short Description"
                required
                {...register("shortDesc")}
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
                {...register("discount")}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-x-2 items-center">
          <div className="input mt-3">
            <label>Change Cover Image</label>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImg(e.target.files[0])}
              />
            </div>
          </div>
          <div className="w-24 h-24 shrink-0 border-2 mt-3">
            <img
              src={item.coverImage}
              alt="cover-image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="input mt-3">
          <label>Course Description</label>
          <div>
            <textarea
              placeholder="Enter Course Description"
              required
              className="h-24 w-full"
              {...register("fullDesc")}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="fw-500">Learning Outcomes</label>
            <button
              type="button"
              onClick={() =>
                append({ description: "", order: fields.length + 1 })
              }
              className="text-sm text-primary fw-500 underline"
            >
              + Add Outcome
            </button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start mb-2">
              <div className="input flex-1">
                <div>
                  <input
                    type="text"
                    placeholder="Outcome description"
                    required
                    {...register(`outcomes.${index}.description`)}
                  />
                </div>
              </div>
              <div className="input w-20 shrink-0">
                <div>
                  <input
                    type="number"
                    placeholder="Order"
                    min={1}
                    {...register(`outcomes.${index}.order`)}
                  />
                </div>
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
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
  );
};

export default EditCourse;
