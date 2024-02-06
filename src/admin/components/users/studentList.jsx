import React from "react";
import { DataTable } from "../../../Components/table";
import ProfileAvatar from "../../../Components/ProfileAvatar";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsArrowsExpand, BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const StudentList = ({ data }) => {
    const navigate = useNavigate()
    const gotoDetails = (id) => {
        navigate(`/studentdetails/${id}`)
    }
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row.firstName, {
      id: "Name",
      cell: (info) => (
        <div className="flex gap-x-2 items-center">
          <ProfileAvatar
            fname={`${info.getValue()}`}
            lname={`${info.row.original.lastName}`}
            url={info.row.original.picture}
            size={45}
            font={15}
          />
          <p className="fw-600 text-primary">{`${info.getValue()} ${
            info.row.original.lastName
          }`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Email",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.phone, {
      id: "Phone",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Joined at",
      cell: (info) => <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isActive, {
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
                onClick={() => gotoDetails(info.getValue())}
              >
                <BsArrowsExpand/> View Details
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
        {data && !!data?.length && (
          <DataTable data={data} columns={columns} />
        )}
      </div>
    </>
  );
};

export default StudentList;
