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
import { getNotify, markUserNotify } from "../../services/api/routineApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { BsThreeDotsVertical } from "react-icons/bs";
import Picker from "../../Components/Loaders/Picker";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Notify = ({ datas }) => {
  const { user } = useAuth()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notify"],
    queryFn: () => getNotify(user.role),
  });

  const [activeButton, setActiveButton] = useState("all");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  const markRead = useMutation({
    mutationFn: markUserNotify,
    mutationKey: ["markRead"],
  });
  const MarkNotify = async (item) => {
    markRead.mutateAsync(item, {
      onSuccess: (data) => {
        toast.success(data.message);
        refetch()
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <div className="notify">
      <div className="not">
        <div className="notify_head">
          <div className="notify_left">
            <button
              onClick={() => handleButtonClick("all")}
              className={activeButton === "all" ? "active" : ""}
            >
              All <span>{data?.data?.length}</span>
            </button>
            <button
              onClick={() => handleButtonClick("unread")}
              className={activeButton === "unread" ? "active" : ""}
            >
              Unread
            </button>
          </div>
          <button className="mark">Mark all as read</button>
        </div>
        {isLoading && (
            <div className="place-center py-36">
              <Picker size={1.7} />
            </div>
          )}
        {data?.data && data?.data?.length ? (
          <div className="notify_body grid gap-4">
            {" "}
            {data?.data.map((item, i) => (
               <div
                key={i}
                className={`bg-primary p-3 rounded-[15px] text-white flex items-center justify-between hover:scale-105 duration-100 ${
                  !item.read && `border-[3px] border-blue-400`
                }`}
              >
                <div className="flex items-center gap-x-2">
                  {item?.body?.includes("signed") ? (
                    <img
                      src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1705678152/rsh/gnup_eusaot.jpg"
                      alt="alt"
                      className="w-12 h-12 circle"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1705678152/rsh/gnup_eusaot.jpg"
                      alt="alt"
                      className="w-12 h-12 circle"
                    />
                  )}
                  <div>
                    <p className="">{item.body}</p>
                    <p className="text-[14px] text-[#808080]">
                      {dayjs(item.createdDate).fromNow()}
                    </p>
                  </div>
                </div>
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
              </div>
            ))}{" "}
          </div>
        ) : (
          <div className="notify_body">
            <p>No Notification</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notify;
