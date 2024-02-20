import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiDeleteBin6Line } from "react-icons/ri";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import SubContent from "./SubContent";
import { deleteCourseContent } from "../../../../services/api/programsApi";
import { toast } from "react-toastify";
import useModal from "../../../../hooks/useModal";
import ReusableModal from "../../../../Components/ReusableModal";
import useDialog from "../../../../hooks/useDialog";

const ContentList = ({ data, courseId }) => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();
  const [selectedId, setSelectedId] = useState();
  const openDelete = (id) => {
    setSelectedId(id);
    ShowDelete(true);
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
                <div onClick={(e) => e.stopPropagation()}>
                <RiDeleteBin6Line className="cursor-pointer text-xl" onClick={() => openDelete(item.id)}/>
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
    </div>
  );
};

export default ContentList;
