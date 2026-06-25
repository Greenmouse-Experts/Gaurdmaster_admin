import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { apiClient } from "../../services/api/authApi";

export default function Messages(props: any) {
  const query = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      let resp = await apiClient.get("/contact-me");
      return resp.data;
    },
  });
  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All Messages</h2>
          {/*<div className="cursor-pointer" onClick={() => setShowModal(true)}>
            <FaPlus />
            Add New FAQ
          </div>*/}
        </div>
        <div className="card_table">
          {/*<FaqsList data={faqs} refetch={refetch} isLoading={isLoading} />*/}
        </div>
      </div>
    </>
  );
}
