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
import { deleteCourse, updateCourse } from "../../../services/api/programsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import EditCourse from "./EditCourse";
import Picker from "../../../Components/Loaders/Picker";
import { RiDeleteBinLine } from "react-icons/ri";
import { DynamicTable } from "../../../Components/DynamicTable";

const CoursesList = ({ data, refetch, isLoading, next, prev , page, count}) => {
  const { Modal: Edit, setShowModal: ShowEdit } = useModal();
  const { Modal: Retract, setShowModal: ShowRetract } = useModal();
  const { Modal: Publish, setShowModal: ShowPublish } = useModal();
  const { Modal: Delete, setShowModal: ShowDelete } = useModal();
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
  const openDelete = (id) => {
    setSelectedId(id);
    ShowDelete(true);
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
  const deleteThisCourse = (val) => {
    setIsBusy(true);
    deleteCourse(val)
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
    columnHelper.accessor((row) => row.title, {
      id: "Title",
      cell: (info) => <p className="!w-[350px] whitespace-normal">{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.shortDesc, {
      id: "Description",
      cell: (info) => <p className="!w-[350px] whitespace-normal">{info.getValue()}</p>,
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
    columnHelper.accessor((row) => row.coverImage, {
      id: "Cover Image",
      cell: (info) => <>{info.getValue() ? <a href={info.getValue()} target="_blank" rel="noopener noreferrer"><img src={info.getValue()} alt="coverImage" className="w-36 h-24 object-cover" /></a> : <p>No Image</p>}</>,
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
        <div>
          {isLoading && (
            <div className="place-center py-36">
              <Picker size={1.7} />
            </div>
          )}
          {data && !!data?.length && <DynamicTable data={data} columns={columns} next={next} prev={prev} page={page} count={count}/>}
        </div>
        <Edit title={"Edit Course"} size={"sm"} type={"withCancel"}>
          <EditCourse
            item={selected}
            close={() => ShowEdit(false)}
            refetch={refetch}
          />
        </Edit>
        <Publish title={""} size={"xs"}>
          <ReusableModal
            title={"Are you sure you want to publish this course"}
            actionTitle={"Publish"}
            cancelTitle={"Cancel"}
            closeModal={() => ShowPublish(false)}
            action={() => updateCourseStatus("active")}
            isBusy={isBusy}
          />
        </Publish>
        <Retract title={""} size={"xs"}>
          <ReusableModal
            title={"Are you sure you want to retract this course"}
            actionTitle={"Retract"}
            cancelTitle={"Cancel"}
            closeModal={() => ShowRetract(false)}
            action={() => updateCourseStatus("inactive")}
            isBusy={isBusy}
          />
        </Retract>
        <Delete title={""} size={"xs"}>
        <ReusableModal
            title={"Are you sure you want to Delete this course"}
            actionTitle={"Delete"}
            cancelTitle={"Cancel"}
            closeModal={() => ShowDelete(false)}
            action={() => deleteThisCourse(selectedId)}
            isBusy={isBusy}
          />
        </Delete>
      </div>
    </>
  );
};

export default CoursesList;
