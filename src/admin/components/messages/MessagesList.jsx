import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../Components/table";
import dayjs from "dayjs";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import useModal from "../../../hooks/useModal";
import ReusableModal from "../../../Components/ReusableModal";
import { markMessageAsRead } from "../../../services/api/messagesApi";
import { toast } from "react-toastify";
import Picker from "../../../Components/Loaders/Picker";

const MessagesList = ({ data, refetch, isLoading }) => {
  const { Modal: MarkRead, setShowModal: ShowMarkRead } = useModal();
  const [selectedId, setSelectedId] = useState();
  const [isBusy, setIsBusy] = useState(false);

  const openMarkRead = (id) => {
    setSelectedId(id);
    ShowMarkRead(true);
  };

  const markAsRead = () => {
    setIsBusy(true);
    markMessageAsRead(selectedId)
      .then((data) => {
        toast.success(data.message || "Message marked as read");
        setIsBusy(false);
        refetch();
        ShowMarkRead(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setIsBusy(false);
      });
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Name",
      cell: (info) => <span className="fw-500">{info.getValue()}</span>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Email",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.message, {
      id: "Message",
      cell: (info) => (
        <span className="line-clamp-2 max-w-md" title={info.getValue()}>
          {info.getValue()}
        </span>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Received At",
      cell: (info) => <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isRead, {
      id: "Status",
      cell: (info) => (
        <>
          {info.getValue() ? (
            <div className="flex items-center gap-x-2">
              <span className="bg-green-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-green-600">Read</span>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <span className="bg-orange-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-orange-600">Unread</span>
            </div>
          )}
        </>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      header: (info) => info.column.id,
      cell: (info) => (
        <>
          <Menu placement="bottom-end">
            <MenuHandler>
              <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none capitalize">
                <BsThreeDotsVertical className="text-xl text-black" />
              </Button>
            </MenuHandler>
            <MenuList>
              {!info.row.original.isRead && (
                <MenuItem
                  className="my-1 fw-500 bg-green-500 text-white flex items-center gap-x-2 pt-1"
                  onClick={() => openMarkRead(info.getValue())}
                >
                  <MdOutlineMarkEmailRead /> Mark as Read
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </>
      ),
    }),
  ];

  return (
    <>
      <div>
        {isLoading && (
          <div className="place-center py-36">
            <Picker size={1.7} />
          </div>
        )}
        {data && !!data?.length && <DataTable data={data} columns={columns} />}
      </div>
      <MarkRead title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to mark this message as read"}
          actionTitle={"Mark as Read"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowMarkRead(false)}
          action={markAsRead}
          isBusy={isBusy}
        />
      </MarkRead>
    </>
  );
};

export default MessagesList;
