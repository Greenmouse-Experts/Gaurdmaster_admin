import { useState } from "react";
import { toast } from "react-toastify";
import { uploadTemplate } from "../../../services/api/certificatesApi";

const AddTemplate = ({ close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [templateDetail, setTemplateDetail] = useState({
    name: "",
    template: null,
  });
  const handleChange = (name, value) => {
    setTemplateDetail({ ...templateDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    const fd = new FormData();
    fd.append("name", templateDetail.name);
    fd.append("template", templateDetail.template);
    uploadTemplate(fd)
      .then((data) => {
        toast.success(data.message || "Template uploaded successfully");
        setIsBusy(false);
        refetch();
        close();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
        setIsBusy(false);
      });
  };
  return (
    <div className="px-4">
      <form action="" onSubmit={submitAction}>
        <div className="input">
          <label>Template Name</label>
          <div>
            <input
              type="text"
              placeholder="Enter Template Name"
              value={templateDetail.name}
              required
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
        <div className="input mt-4">
          <label>Template File</label>
          <div>
            <input
              type="file"
              required
              onChange={(e) => handleChange("template", e.target.files[0])}
            />
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <button className="bg-primary w-full py-3 fw-500 lg:text-lg">
            {isBusy ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTemplate;
