import React, { useState } from "react";
import "../stylesheet/adminstyles.css";
import {
  Menu,
  Button,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotify,
  getReadNotify,
  getUnreadNotify,
  markUserNotify,
  markAllNotify,
} from "../../services/api/routineApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { BsThreeDotsVertical } from "react-icons/bs";
import Picker from "../../Components/Loaders/Picker";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

const Notify = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const params = { page, pageSize: PAGE_SIZE };

  const allQuery = useQuery({
    queryKey: ["notify-all", params],
    queryFn: () => getNotify(params),
    enabled: activeTab === "all",
  });

  const readQuery = useQuery({
    queryKey: ["notify-read", params],
    queryFn: () => getReadNotify(params),
    enabled: activeTab === "read",
  });

  const unreadQuery = useQuery({
    queryKey: ["notify-unread", params],
    queryFn: () => getUnreadNotify(params),
    enabled: activeTab === "unread",
  });

  const activeQuery =
    activeTab === "all" ? allQuery : activeTab === "read" ? readQuery : unreadQuery;

  const { data, isLoading } = activeQuery;

  const refetchAll = () => {
    allQuery.refetch();
    readQuery.refetch();
    unreadQuery.refetch();
  };

  const markRead = useMutation({
    mutationFn: markUserNotify,
    onSuccess: (res) => {
      toast.success(res.message);
      refetchAll();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const markAllRead = useMutation({
    mutationFn: markAllNotify,
    onSuccess: (res) => {
      toast.success(res.message);
      refetchAll();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const MarkNotify = (id) => {
    markRead.mutate(id);
  };

  const notifications = data?.data ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="notify">
      <div className="not">
        <div className="notify_head">
          <div className="notify_left">
            <button
              onClick={() => handleTabChange("all")}
              className={activeTab === "all" ? "active" : ""}
            >
              All <span>{allQuery.data?.count ?? 0}</span>
            </button>
            <button
              onClick={() => handleTabChange("unread")}
              className={activeTab === "unread" ? "active" : ""}
            >
              Unread <span>{unreadQuery.data?.count ?? 0}</span>
            </button>
            <button
              onClick={() => handleTabChange("read")}
              className={activeTab === "read" ? "active" : ""}
            >
              Read
            </button>
          </div>
          {activeTab === "unread" && (unreadQuery.data?.count ?? 0) > 0 && (
            <button
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              {markAllRead.isPending ? "Marking..." : "Mark all as read"}
            </button>
          )}
        </div>

        {isLoading && (
          <div className="place-center py-36">
            <Picker size={1.7} />
          </div>
        )}

        {!isLoading && notifications.length > 0 ? (
          <>
            <div className="notify_body grid gap-4">
              {notifications.map((item, i) => (
                <div
                  key={i}
                  className={`bg-primary p-3 rounded-[15px] text-white flex items-center justify-between hover:scale-105 duration-100 ${
                    !item.read ? "border-[3px] border-blue-400" : ""
                  }`}
                >
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1705678152/rsh/gnup_eusaot.jpg"
                      alt="alt"
                      className="w-12 h-12 circle"
                    />
                    <div>
                      {item.title && <p className="fw-600">{item.title}</p>}
                      <p className={item.title ? "text-sm" : ""}>{item.body}</p>
                      <p className="text-[14px] text-[#808080]">
                        {dayjs(item.createdDate).fromNow()}
                      </p>
                    </div>
                  </div>
                  {!item.read && (
                    <div>
                      <Menu placement="bottom-end">
                        <MenuHandler>
                          <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-white capitalize">
                            <BsThreeDotsVertical className="text-xl" />
                          </Button>
                        </MenuHandler>
                        <MenuList className="bg-[#0D0D0D]">
                          <MenuItem
                            className="my-1 fw-500 text-white bg-primary pt-1"
                            onClick={() => MarkNotify(item.id)}
                          >
                            Mark as read
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          !isLoading && (
            <div className="notify_body">
              <p>No Notifications</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Notify;
