import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import SubContent from "./SubContent";
import EditContent from "./EditContent";
import { deleteCourseContent } from "../../../../services/api/programsApi";
import { toast } from "react-toastify";
import ReusableModal from "../../../../Components/ReusableModal";
import useDialog from "../../../../hooks/useDialog";
import useModal from "../../../../hooks/useModal";
import { getPageCount } from "../../../../Components/utils";

const ContentList = ({ data, courseId, refetch, next, prev, page, count }) => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();
  const { Modal: Edit, setShowModal: ShowEdit } = useModal();
  const [selectedId, setSelectedId] = useState();
  const [selected, setSelected] = useState();
  const openDelete = (id) => {
    setSelectedId(id);
    ShowDelete(true);
  };
  const openEdit = (item) => {
    setSelected(item);
    ShowEdit(true);
  };
  const [isBusy, setIsBusy] = useState(false)
  const deleteThisCourseContent = (val) => {
    setIsBusy(true);
    deleteCourseContent(val)
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
  return (
    <div className="mt-8">
      {data.map((item, i) => {
        return (
          <Accordion
            placeholder={""}
            open={open === i + 1}
            className="mb-6"
            icon={
              open ? (
                <RiArrowDropDownLine className="text-3xl" />
              ) : (
                <RiArrowDropUpLine className="text-3xl" />
              )
            }
            key={i}
          >
            <AccordionHeader
              placeholder={""}
              className="border-b-2 p-4"
              onClick={() => handleOpen(i + 1)}
            >
              <div className="flex gap-x-2 items-center">
                <MdOutlineOndemandVideo className="text-" />
                <p className="text-lg">{item.title}</p>
                <div className="flex items-center gap-x-3" onClick={(e) => e.stopPropagation()}>
                  <FaRegEdit className="cursor-pointer text-xl" onClick={() => openEdit(item)} />
                  <RiDeleteBin6Line className="cursor-pointer text-xl" onClick={() => openDelete(item.id)} />
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody className="px-4 bg-gray-50">
              <div>
                <SubContent id={item.id} courseId={courseId} />
              </div>
            </AccordionBody>
          </Accordion>
        );
      })}
      {count > 0 && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <p>
            Page {page} of {getPageCount(count, 10)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-40"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={next}
              className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-40"
              disabled={page >= getPageCount(count, 10)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <Delete title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to Delete this course content"}
          actionTitle={"Delete"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowDelete(false)}
          action={() => deleteThisCourseContent(selectedId)}
          isBusy={isBusy}
        />
      </Delete>
      <Edit title={"Edit Course Content"} size={"md"} type={"withCancel"}>
        <EditContent
          item={selected}
          courseId={courseId}
          close={() => ShowEdit(false)}
          refetch={refetch}
        />
      </Edit>
    </div>
  );
};

export default ContentList;
