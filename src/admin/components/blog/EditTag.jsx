import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateBlogTag } from "../../../services/api/blogApi";

const EditTag = ({ data, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [uTag, setUTag] = useState({
    tag: data?.tag || "",
  });
  const handleChange = (name, value) => {
    setUTag({ ...uTag, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    updateBlogTag(data.id, uTag)
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
            <label>Tag Name</label>
            <div>
              <input
                type="text"
                placeholder="Enter Program Title"
                value={uTag.tag}
                required
                onChange={(e) => handleChange("tag", e.target.value)}
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

export default EditTag;
