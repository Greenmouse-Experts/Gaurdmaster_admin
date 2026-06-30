import { useQuery } from "@tanstack/react-query";
import { getCertificateTemplates } from "../../../services/api/certificatesApi";
import TemplatesList from "../../components/certificates/TemplatesList";

export default function Templates() {
  const { data, isLoading } = useQuery({
    queryKey: ["certificateTemplates"],
    queryFn: getCertificateTemplates,
  });

  const templates = Array.isArray(data) ? data : data?.data;

  return (
    <div className="adminman">
      <div className="admin_head">
        <h2>Certificate Templates</h2>
      </div>
      <div className="card_table">
        <TemplatesList data={templates} isLoading={isLoading} />
      </div>
    </div>
  );
}
