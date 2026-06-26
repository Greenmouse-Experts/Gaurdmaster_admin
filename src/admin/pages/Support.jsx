import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { apiClient } from "../../services/api/authApi";
import useModal from "../../hooks/useModal";
import Picker from "../../Components/Loaders/Picker";

const Support = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [markingId, setMarkingId] = useState(null);
  const { Modal, setShowModal } = useModal();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contact-me"],
    queryFn: async () => {
      const resp = await apiClient.get("contact-me");
      return resp.data;
    },
  });

  const messages = data?.data || [];
  const filtered = messages.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.interestedIn?.toLowerCase().includes(q)
    );
  });

  const openMessage = (item) => {
    setSelected(item);
    setShowModal(true);
  };

  const markAsRead = (item) => {
    setMarkingId(item.id);
    apiClient
      .patch(`contact-me/${item.id}/read`)
      .then(() => {
        toast.success("Message marked as read");
        setSelected((prev) => (prev ? { ...prev, isRead: true } : prev));
        refetch();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setMarkingId(null));
  };

  return (
    <div className="adminman">
      <div className="admin_head col">
        <h2>Contact Messages</h2>

        <div className="search_input">
          <input
            type="text"
            placeholder="Search by name, email or interest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>
            <FiSearch />
          </span>
        </div>
      </div>

      <div className="card_table student_table">
        {isLoading ? (
          <div className="place-center py-36">
            <Picker size={1.7} />
          </div>
        ) : filtered.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S/L</th>
                <th>Name</th>
                <th>Email</th>
                <th>Interested In</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{`${item.firstName} ${item.lastName}`}</td>
                  <td>{item.email}</td>
                  <td>{item.interestedIn || "N/A"}</td>
                  <td>{dayjs(item.createdDate).format("DD MMMM YYYY")}</td>
                  <td>
                    {item.isRead ? (
                      <span className="flex items-center gap-x-2">
                        <span className="bg-green-600 w-3 h-3 circle"></span>
                        <span className="fw-500 text-green-600">Read</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-x-2">
                        <span className="bg-orange-600 w-3 h-3 circle"></span>
                        <span className="fw-500 text-orange-600">Unread</span>
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="text-primary fw-500 underline"
                      onClick={() => openMessage(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="cart_table">
            <table>
              <thead>
                <tr>
                  <th>S/L</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Interested In</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
            <p className="p_line">No Data Found</p>
          </div>
        )}
      </div>

      <Modal title={"Message Details"} size={"md"} type={"withCancel"}>
        {selected && (
          <div className="px-2 pt-2 text-black">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="fw-500">{`${selected.firstName} ${selected.lastName}`}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Date</p>
                <p className="fw-500">
                  {dayjs(selected.createdDate).format("DD MMMM YYYY, h:mm A")}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="fw-500 break-words">{selected.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="fw-500">{selected.phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Interested In</p>
                <p className="fw-500">{selected.interestedIn || "N/A"}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm">Message</p>
              <p className="mt-1 whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="mt-8 flex justify-end">
              {selected.isRead ? (
                <span className="fw-500 text-green-600">Already read</span>
              ) : (
                <button
                  className="bg-primary text-white px-6 py-2 rounded disabled:opacity-60"
                  onClick={() => markAsRead(selected)}
                  disabled={markingId === selected.id}
                >
                  {markingId === selected.id ? "Marking..." : "Mark as read"}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Support;
