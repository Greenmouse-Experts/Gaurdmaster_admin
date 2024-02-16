import React from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import SubContent from "./SubContent";

const ContentList = ({ data, courseId }) => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
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
                <MdOutlineOndemandVideo className="text-"/>
                <p className="text-lg">{item.title}</p>
              </div>
            </AccordionHeader>
            <AccordionBody className="px-4 bg-gray-50">
              <div>
                <SubContent id={item.id} courseId={courseId}/>
              </div>
            </AccordionBody>
          </Accordion>
        );
      })}
    </div>
  );
};

export default ContentList;
