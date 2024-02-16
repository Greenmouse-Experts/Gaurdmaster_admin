import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../Components/table";
import dayjs from "dayjs";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsArrowsExpand, BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import useModal from "../../../hooks/useModal";
import EditProgram from "./EditProgram";
import { FaRegEdit } from "react-icons/fa";
import ReusableModal from "../../../Components/ReusableModal";
import { updateCourse } from "../../../services/api/programsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";

const CoursesList = ({ data, refetch }) => {
  const { Modal: Edit, setShowModal: ShowEdit } = useModal();
  const { Modal: Retract, setShowModal: ShowRetract } = useModal();
  const { Modal: Publish, setShowModal: ShowPublish } = useModal();
  const [selected, setSelected] = useState();
  const [selectedId, setSelectedId] = useState();
  const navigate = useNavigate();
  const gotoDetails = (id) => {
    navigate(`/courses/${id}`);
  };
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
  const [isBusy, setIsBusy] = useState(false);
  const updateCourseStatus = (val) => {
    const payload = {
      isPublished: val === "active" ? true : false,
    };
    setIsBusy(true);
    updateCourse(selectedId, payload)
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
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row.title, {
      id: "Title",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.shortDesc, {
      id: "Description",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.price, {
      id: "Price",
      cell: (info) => <>{`$${info.getValue()}.00`}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.program, {
      id: "Program",
      cell: (info) => <>{info.getValue()?.title}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.instructor, {
      id: "Instructor",
      cell: (info) => (
        <>{`${info.getValue()?.firstName} ${info.getValue()?.lastName}`}</>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created At",
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
              <span className="fw-500 text-green-600">Published</span>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <span className="bg-orange-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-orange-600">Restricted</span>
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
                onClick={() => gotoDetails(info.getValue())}
              >
                <FaRegEye /> View Details
              </MenuItem>
              <MenuItem
                className="my-1 fw-500 flex items-center gap-x-2 pt-1"
                onClick={() => openEdit(info.row.original)}
              >
                <FaRegEdit /> Edit
              </MenuItem>
              {info.row.original.isPublished ? (
                <MenuItem
                  className="my-1 pt-1 fw-500 bg-red-500 text-white flex items-center gap-x-2 pt-1"
                  onClick={() => openRetract(info.getValue())}
                >
                  <MdOutlineUnpublished /> Retract
                </MenuItem>
              ) : (
                <MenuItem
                  className="my-1 pt-1 fw-500 bg-green-500 text-white flex items-center gap-x-2 pt-1"
                  onClick={() => openPublish(info.getValue())}
                >
                  <MdOutlinePublishedWithChanges /> Publish
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
      <div>
        {data && !!data?.length && <DataTable data={data} columns={columns} />}
      </div>
      <Edit title={"Edit Program"} size={"sm"} type={"withCancel"}>
        <EditProgram
          data={selected}
          close={() => ShowEdit(false)}
          refetch={refetch}
        />
      </Edit>
      <Publish title={""} size={"sm"}>
        <ReusableModal
          title={"Are you sure you want to publish this course"}
          actionTitle={"Publish"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowPublish(false)}
          action={() => updateCourseStatus("active")}
          isBusy={isBusy}
        />
      </Publish>
      <Retract title={""} size={"sm"}>
        <ReusableModal
          title={"Are you sure you want to retract this course"}
          actionTitle={"Retract"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowRetract(false)}
          action={() => updateCourseStatus("inactive")}
          isBusy={isBusy}
        />
      </Retract>
      </div>
    </>
  );
};

export default CoursesList;
