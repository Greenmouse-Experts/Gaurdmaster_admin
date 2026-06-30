import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdOutlineUnpublished } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { DataTable } from "../../../Components/table";
import Picker from "../../../Components/Loaders/Picker";
import useModal from "../../../hooks/useModal";
import ReusableModal from "../../../Components/ReusableModal";
import { revokeCertificate, deleteCertificate } from "../../../services/api/certificatesApi";
import { toast } from "react-toastify";
import EditCertificate from "./EditCertificate";

const CertificatesList = ({ data, refetch, isLoading }) => {
  const { Modal: Edit, setShowModal: ShowEdit } = useModal();
  const { Modal: Revoke, setShowModal: ShowRevoke } = useModal();
  const { Modal: Delete, setShowModal: ShowDelete } = useModal();
  const [selected, setSelected] = useState();
  const [selectedId, setSelectedId] = useState();
  const [isBusy, setIsBusy] = useState(false);

  const openEdit = (item) => {
    setSelected(item);
    ShowEdit(true);
  };
  const openRevoke = (id) => {
    setSelectedId(id);
    ShowRevoke(true);
  };
  const openDelete = (id) => {
    setSelectedId(id);
    ShowDelete(true);
  };

  const revokeThisCertificate = () => {
    setIsBusy(true);
    revokeCertificate(selectedId)
      .then((data) => {
        toast.success(data.message || "Certificate revoked");
        setIsBusy(false);
        refetch();
        ShowRevoke(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setIsBusy(false);
      });
  };

  const deleteThisCertificate = () => {
    setIsBusy(true);
    deleteCertificate(selectedId)
      .then((data) => {
        toast.success(data.message || "Certificate deleted");
        setIsBusy(false);
        refetch();
        ShowDelete(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        setIsBusy(false);
      });
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row.certificateNumber, {
      id: "Certificate No.",
      cell: (info) => <span className="fw-500">{info.getValue()}</span>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.student, {
      id: "Student",
      cell: (info) => (
        <>{`${info.getValue()?.firstName ?? ""} ${info.getValue()?.lastName ?? ""}`}</>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.course?.title, {
      id: "Course",
      cell: (info) => (
        <span className="line-clamp-2 max-w-md" title={info.getValue()}>
          {info.getValue()}
        </span>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.issuedAt, {
      id: "Issued At",
      cell: (info) => <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isRevoked, {
      id: "Status",
      cell: (info) => (
        <>
          {info.getValue() ? (
            <div className="flex items-center gap-x-2">
              <span className="bg-red-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-red-600">Revoked</span>
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <span className="bg-green-600 w-4 h-4 circle"></span>{" "}
              <span className="fw-500 text-green-600">Active</span>
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
        <Menu placement="bottom-end">
          <MenuHandler>
            <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none capitalize">
              <BsThreeDotsVertical className="text-xl text-black" />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem
              className="my-1 fw-500 flex items-center gap-x-2 pt-1"
              onClick={() =>
                window.open(info.row.original.certificateUrl, "_blank", "noopener,noreferrer")
              }
            >
              <FaRegEye /> View Certificate
            </MenuItem>
            <MenuItem
              className="my-1 fw-500 flex items-center gap-x-2 pt-1"
              onClick={() => openEdit(info.row.original)}
            >
              <FaRegEdit /> Edit
            </MenuItem>
            {!info.row.original.isRevoked && (
              <MenuItem
                className="my-1 fw-500 bg-red-500 text-white flex items-center gap-x-2 pt-1"
                onClick={() => openRevoke(info.getValue())}
              >
                <MdOutlineUnpublished /> Revoke
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
      ),
    }),
  ];

  return (
    <div>
      {isLoading && (
        <div className="place-center py-36">
          <Picker size={1.7} />
        </div>
      )}
      {data && !!data?.length && <DataTable data={data} columns={columns} />}
      <Edit title={"Edit Certificate"} size={"md"} type={"withCancel"}>
        <EditCertificate
          data={selected}
          close={() => ShowEdit(false)}
          refetch={refetch}
        />
      </Edit>
      <Revoke title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to revoke this certificate"}
          actionTitle={"Revoke"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowRevoke(false)}
          action={revokeThisCertificate}
          isBusy={isBusy}
        />
      </Revoke>
      <Delete title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to delete this certificate"}
          actionTitle={"Delete"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowDelete(false)}
          action={deleteThisCertificate}
          isBusy={isBusy}
        />
      </Delete>
    </div>
  );
};

export default CertificatesList;
