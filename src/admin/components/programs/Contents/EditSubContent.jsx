import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateSubContent } from "../../../../services/api/programsApi";
import { toast } from "react-toastify";

const EditSubContent = ({ close, refetch, item }) => {
  const update = useMutation({
    mutationFn: (payload) => updateSubContent(item.id, payload),
    mutationKey: ["editSubContent"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const [userDetail, setUserDetail] = useState({
    title: item?.title || "",
    duration: item?.duration || 0,
  });

  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };

  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    update.mutate(
      { ...userDetail, duration: Number(userDetail.duration) },
      {
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
      },
    );
  };

  return (
    <div className="px-4">
      <form onSubmit={submitAction}>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="input">
            <label>Sub Content Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Sub Content Title"
                value={userDetail.title}
                required
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="input">
            <label>Duration (minutes)</label>
            <div>
              <input
                type="number"
                placeholder="Enter Duration"
                value={userDetail.duration}
                required
                onChange={(e) => handleChange("duration", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <button className="btn-primary w-full py-3 fw-500 lg:text-lg">
            {isBusy ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubContent;
