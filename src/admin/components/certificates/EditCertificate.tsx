import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getCertificateTemplates,
  updateCertificate,
} from "../../../services/api/certificatesApi";

const EditCertificate = ({ data, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [certDetail, setCertDetail] = useState({
    certificateUrl: data?.certificateUrl || "",
    templateId: data?.templateId || data?.template?.id || "",
    certificateNumber: data?.certificateNumber || "",
  });

  const { data: templatesData, isLoading: templatesLoading } = useQuery({
    queryKey: ["certificateTemplates"],
    queryFn: getCertificateTemplates,
  });
  const templates = Array.isArray(templatesData)
    ? templatesData
    : templatesData?.data;

  const handleChange = (name, value) => {
    setCertDetail({ ...certDetail, [name]: value });
  };

  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    updateCertificate(data.id, certDetail)
      .then((res) => {
        toast.success(res.message || "Certificate updated");
        setIsBusy(false);
        refetch();
        close();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setIsBusy(false);
      });
  };

  return (
    <div className="px-4">
      <form onSubmit={submitAction}>
        <div className="input">
          <label>Certificate Number</label>
          <div>
            <input
              type="text"
              placeholder="Enter Certificate Number"
              value={certDetail.certificateNumber}
              required
              onChange={(e) => handleChange("certificateNumber", e.target.value)}
            />
          </div>
        </div>
        <div className="input mt-4">
          <label>Certificate URL</label>
          <div>
            <input
              type="text"
              placeholder="Enter Certificate URL"
              value={certDetail.certificateUrl}
              required
              onChange={(e) => handleChange("certificateUrl", e.target.value)}
            />
          </div>
        </div>
        <div className="input mt-4">
          <label>Template</label>
          <div>
            <select
              value={certDetail.templateId}
              required
              disabled={templatesLoading}
              onChange={(e) => handleChange("templateId", e.target.value)}
            >
              <option value="" disabled>
                {templatesLoading ? "Loading templates..." : "Select Template"}
              </option>
              {templates?.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name || template.title || template.id}
                </option>
              ))}
            </select>
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

export default EditCertificate;
