import { useQuery } from "@tanstack/react-query";
import MessagesList from "../components/messages/MessagesList";
import { getMessages } from "../../services/api/messagesApi";

export default function Messages() {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  const messages = Array.isArray(data) ? data : data?.data;

  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All Messages</h2>
        </div>
        <div className="card_table">
          <MessagesList data={messages} refetch={refetch} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
