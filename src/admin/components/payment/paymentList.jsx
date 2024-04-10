import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPayments } from "../../../services/api/paymentApi";
import { DataTable } from "../../../Components/table";
import Picker from "../../../Components/Loaders/Picker";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { createColumnHelper } from "@tanstack/react-table";
import useDialog from "../../../hooks/useDialog";
import PaymentDetails from "./paymentDetails";
import dayjs from "dayjs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DynamicTable } from "../../../Components/DynamicTable";

const PaymentList = ({ status }) => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ["getPaymets", status, page],
    queryFn: () => getPayments(status, page),
  });
  
  const handleNext = () => {
    if(page * 10 > data?.count){
      toast.info('This is the last page')
    }else{
      setPage((old) => old + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  const handlePrev = () => {
    if(page > 1){
      setPage((old) => old - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }else{
      toast.info('This is the first page')
    }
  }
  const { Dialog, setShowModal } = useDialog();
  const [selected, setSelected] = useState();
  const openView = (item) => {
    setSelected(item);
    setShowModal(true);
  };
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row.trx.id, {
      id: "Reference Id",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.subAmount, {
      id: "Course Amount (Sub Total)",
      cell: (info) => <>{`$${info.getValue()}`}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.amount, {
      id: "Amount Paid",
      cell: (info) => <>{`$${info.getValue()}`}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.createdDate, {
      id: "Created At",
      cell: (info) => <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.status, {
      id: "Status",
      cell: (info) => (
        <>
          {info.getValue() === "confirmed" ? (
            <div className="flex items-center gap-x-2">
              <span className="bg-green-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-green-600">Completed</span>
            </div>
          ) : info.getValue() === "pending" ? (
            <div className="flex items-center gap-x-2">
              <span className="bg-orange-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-orange-600">Pending</span>
            </div>
          ) : info.getValue() === "cancelled" ? (
            <div className="flex items-center gap-x-2">
              <span className="bg-red-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-red-600">Cancelled</span>
            </div>
          ) : (
            ""
          )}
        </>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.buyer, {
      id: "Student",
      cell: (info) => <>{`${info.getValue().firstName} ${info.getValue().lastName}`}</>,
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
                onClick={() => openView(info.row.original.orderItems)}
              >
                View Details
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
        {data?.data && !!data?.data?.length && (
          <DynamicTable
            data={data?.data}
            columns={columns}
            next={handleNext}
            prev={handlePrev}
            page={page}
            count={data?.count}
          />
        )}
      </div>
      <Dialog title={'Purchased Items'}>
        <PaymentDetails data={selected} />
      </Dialog>
    </>
  );
};

export default PaymentList;
