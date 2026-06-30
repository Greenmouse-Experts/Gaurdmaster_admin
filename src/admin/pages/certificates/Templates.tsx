import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa6";
import { getCertificateTemplates } from "../../../services/api/certificatesApi";
import TemplatesList from "../../components/certificates/TemplatesList";
import AddTemplate from "../../components/certificates/AddTemplate";
import useModal from "../../../hooks/useModal";

export default function Templates() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["certificateTemplates"],
    queryFn: getCertificateTemplates,
  });
  const { Modal, setShowModal } = useModal();

  const templates = Array.isArray(data) ? data : data?.data;

  return (
    <div className="adminman">
      <div className="admin_head">
        <h2>Certificate Templates</h2>
        <div className="cursor-pointer" onClick={() => setShowModal(true)}>
          <FaPlus />
          Add New Template
        </div>
      </div>
      <div className="card_table">
        <TemplatesList data={templates} refetch={refetch} isLoading={isLoading} />
      </div>
      <Modal title={"Add New Template"} size={"sm"} type={"withCancel"}>
        <AddTemplate close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </div>
  );
}
