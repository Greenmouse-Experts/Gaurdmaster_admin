import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { DataTable } from "../../../Components/table";
import Picker from "../../../Components/Loaders/Picker";

const TemplatesList = ({ data, isLoading }) => {
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
  ];

  return (
    <div>
      {isLoading && (
        <div className="place-center py-36">
          <Picker size={1.7} />
        </div>
      )}
      {data && !!data?.length && <DataTable data={data} columns={columns} />}
    </div>
  );
};

export default TemplatesList;
