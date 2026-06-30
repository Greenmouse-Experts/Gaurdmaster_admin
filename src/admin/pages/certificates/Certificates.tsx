import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "../../../services/api/certificatesApi";
import CertStats from "./CertStats";
import CertificatesList from "../../components/certificates/CertificatesList";

export default function Certificates() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });

  const certificates = Array.isArray(data) ? data : data?.data;

  return (
    <div className="adminman">
      <CertStats />
      <div className="admin_head mt-8">
        <h2>All Certificates</h2>
      </div>
      <div className="card_table">
        <CertificatesList data={certificates} refetch={refetch} isLoading={isLoading} />
      </div>
    </div>
  );
}
