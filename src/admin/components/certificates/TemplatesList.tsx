import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCheckCircle } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { DataTable } from "../../../Components/table";
import Picker from "../../../Components/Loaders/Picker";
import useModal from "../../../hooks/useModal";
import ReusableModal from "../../../Components/ReusableModal";
import { setDefaultTemplate, deleteTemplate } from "../../../services/api/certificatesApi";

const TemplatesList = ({ data, refetch, isLoading }) => {
  const { Modal: SetDefault, setShowModal: ShowSetDefault } = useModal();
  const { Modal: Delete, setShowModal: ShowDelete } = useModal();
  const [selectedId, setSelectedId] = useState();
  const [isBusy, setIsBusy] = useState(false);

  const openSetDefault = (id) => {
    setSelectedId(id);
    ShowSetDefault(true);
  };
  const openDelete = (id) => {
    setSelectedId(id);
    ShowDelete(true);
  };

  const setThisDefault = () => {
    setIsBusy(true);
    setDefaultTemplate(selectedId)
      .then((data) => {
        toast.success(data.message || "Template set as default");
        setIsBusy(false);
        refetch();
        ShowSetDefault(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
        setIsBusy(false);
      });
  };

  const deleteThisTemplate = () => {
    setIsBusy(true);
    deleteTemplate(selectedId)
      .then((data) => {
        toast.success(data.message || "Template deleted");
        setIsBusy(false);
        refetch();
        ShowDelete(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
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
    columnHelper.accessor((row) => row.storageType, {
      id: "Storage Type",
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.fileUrl, {
      id: "File",
      cell: (info) =>
        info.getValue() ? (
          <a
            href={info.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            View File
          </a>
        ) : (
          <span>No File</span>
        ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created At",
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
        <Menu placement="bottom-end">
          <MenuHandler>
            <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none capitalize">
              <BsThreeDotsVertical className="text-xl text-black" />
            </Button>
          </MenuHandler>
          <MenuList>
            {!info.row.original.isActive && (
              <MenuItem
                className="my-1 fw-500 flex items-center gap-x-2 pt-1"
                onClick={() => openSetDefault(info.getValue())}
              >
                <MdOutlineCheckCircle /> Set Default
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
      <SetDefault title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to set this as the default template"}
          actionTitle={"Set Default"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowSetDefault(false)}
          action={setThisDefault}
          isBusy={isBusy}
        />
      </SetDefault>
      <Delete title={""} size={"xs"}>
        <ReusableModal
          title={"Are you sure you want to delete this template"}
          actionTitle={"Delete"}
          cancelTitle={"Cancel"}
          closeModal={() => ShowDelete(false)}
          action={deleteThisTemplate}
          isBusy={isBusy}
        />
      </Delete>
    </div>
  );
};

export default TemplatesList;
