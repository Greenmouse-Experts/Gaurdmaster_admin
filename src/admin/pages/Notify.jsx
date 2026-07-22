import React, { useState } from "react";
import "../stylesheet/adminstyles.css";
import {
  Menu,
  Button,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getNotify,
  getReadNotify,
  getUnreadNotify,
  markUserNotify,
} from "../../services/api/routineApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { BsThreeDotsVertical } from "react-icons/bs";
import Picker from "../../Components/Loaders/Picker";
import { toast } from "react-toastify";

const Notify = () => {
  const [activeTab, setActiveTab] = useState("all");

  const allQuery = useQuery({
    queryKey: ["notify-all"],
    queryFn: getNotify,
    enabled: activeTab === "all",
  });

  const readQuery = useQuery({
    queryKey: ["notify-read"],
    queryFn: getReadNotify,
    enabled: activeTab === "read",
  });

  const unreadQuery = useQuery({
    queryKey: ["notify-unread"],
    queryFn: getUnreadNotify,
    enabled: activeTab === "unread",
  });

  const activeQuery =
    activeTab === "all" ? allQuery : activeTab === "read" ? readQuery : unreadQuery;

  const { data, isLoading } = activeQuery;

  const refetchActive = () => activeQuery.refetch();

  const markRead = useMutation({
    mutationFn: markUserNotify,
    mutationKey: ["markRead"],
  });

  const MarkNotify = (id) => {
    markRead.mutateAsync(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        refetchActive();
        // also invalidate all so the count updates when switching back
        allQuery.refetch();
        unreadQuery.refetch();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  const notifications = data?.data ?? [];

  return (
    <div className="notify">
      <div className="not">
        <div className="notify_head">
          <div className="notify_left">
            <button
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "active" : ""}
            >
              All <span>{allQuery.data?.data?.length ?? 0}</span>
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={activeTab === "unread" ? "active" : ""}
            >
              Unread <span>{unreadQuery.data?.data?.length ?? 0}</span>
            </button>
            <button
              onClick={() => setActiveTab("read")}
              className={activeTab === "read" ? "active" : ""}
            >
              Read
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="place-center py-36">
            <Picker size={1.7} />
          </div>
        )}

        {!isLoading && notifications.length > 0 ? (
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
                    <p>{item.body}</p>
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
