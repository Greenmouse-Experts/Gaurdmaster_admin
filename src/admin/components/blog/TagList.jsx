import React, { useState } from "react";
import { DataTable } from "../../../Components/table";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsArrowsExpand, BsThreeDotsVertical } from "react-icons/bs";
import dayjs from "dayjs";
import Picker from "../../../Components/Loaders/Picker";
import useDialog from "../../../hooks/useDialog";
import EditTag from "./EditTag";
import { deleteBlogTag, updateBlogTag } from "../../../services/api/blogApi";
import ReusableModal from "../../../Components/ReusableModal";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

const TagList = ({ data, isLoading, refetch }) => {
  const { Dialog: Edit, setShowModal: ShowEdit } = useDialog();
  const { Dialog: Retract, setShowModal: ShowRetract } = useDialog();
  const { Dialog: Publish, setShowModal: ShowPublish } = useDialog();
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();
  const [selected, setSelected] = useState();
  const [selectedId, setSelectedId] = useState();
  const openEdit = (item) => {
    setSelected(item);
    ShowEdit(true);
  };
  const openPublish = (id) => {
    setSelectedId(id);
    ShowPublish(true);
  };
  const openRetract = (id) => {
    setSelectedId(id);
    ShowRetract(true);
  };
  const openDelete = (id) => {
    setSelectedId(id);
    ShowDelete(true);
  };
  const [isBusy, setIsBusy] = useState(false);
  const updateTagStatus = (val) => {
    const payload = {
      isPublished: val === "active" ? true : false,
    };
    setIsBusy(true);
    updateBlogTag(selectedId, payload)
      .then((data) => {
        toast.success(data.message);
        setIsBusy(false);
        refetch();
        ShowPublish(false);
        ShowRetract(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      });
  };
  const deleteThisTag = (val) => {
    setIsBusy(true);
    deleteBlogTag(val)
      .then((data) => {
        toast.success(data.message);
        setIsBusy(false);
        refetch();
        ShowDelete(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      });
  };
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row.tag, {
      id: "Tag Name",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Date Created",
      cell: (info) => <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isPublished, {
      id: "Status",
      cell: (info) => (
        <>
          {info.getValue() ? (
            <div className="flex items-center gap-x-2">
              <span className="bg-green-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-green-600">Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <span className="bg-orange-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-orange-600">Inactive</span>
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
            <MenuList className="">
              <MenuItem
                className="my-1 fw-500 flex items-center gap-x-2 pt-1"
                onClick={() => openEdit(info.row.original)}
              >
                <FaRegEdit /> Edit
              </MenuItem>
              {info.row.original.isPublished ? (
                <MenuItem
                  className="my-1 fw-500 bg-red-500 text-white flex items-center gap-x-2 pt-1"
                  onClick={() => openRetract(info.getValue())}
                >
                  <MdOutlineUnpublished /> Retract
                </MenuItem>
              ) : (
                <MenuItem
                  className="my-1 fw-500 bg-green-500 text-white flex items-center gap-x-2 pt-1"
                  onClick={() => openPublish(info.getValue())}
                >
                  <MdOutlinePublishedWithChanges /> Publish
                </MenuItem>
              )}
              <MenuItem
                className="my-1 fw-500 bg-red-500 text-white flex items-center gap-x-2 pt-1"
                onClick={() => openDelete(info.getValue())}
              >
                <RiDeleteBinLine /> Delete
              </MenuItem>
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
        {data && !!data?.data.length && (
          <DataTable data={data.data} columns={columns} />
        )}
      </div>
      <Edit title={"Edit Tag"} size={"sm"} type={"withCancel"}>
        <EditTag
          data={selected}
          close={() => ShowEdit(false)}
          refetch={refetch}
        />
      </Edit>
      <Publish title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to publish this Tag"}
          actionTitle={"Publish"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowPublish(false)}
          action={() => updateTagStatus("active")}
          isBusy={isBusy}
        />
      </Publish>
      <Retract title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to retract this Tag"}
          actionTitle={"Retract"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowRetract(false)}
          action={() => updateTagStatus("inactive")}
          isBusy={isBusy}
        />
      </Retract>
      <Delete title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to Delete this Tag"}
          actionTitle={"Delete"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowDelete(false)}
          action={() => deleteThisTag(selectedId)}
          isBusy={isBusy}
        />
      </Delete>
    </>
  );
};

export default TagList;
