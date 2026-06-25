import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { DataTable } from "../../../Components/table";
import Picker from "../../../Components/Loaders/Picker";
import { getStudentOrders } from "../../../services/api/usersApi";

const StatusPill = ({ value }) => {
  const status = (value || "").toLowerCase();
  if (status === "confirmed" || status === "completed" || status === "success") {
    return (
      <div className="flex items-center gap-x-2">
        <span className="bg-green-600 w-4 h-4 circle"></span>
        <span className="fw-500 text-green-600 capitalize">{value}</span>
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="flex items-center gap-x-2">
        <span className="bg-orange-600 w-4 h-4 circle"></span>
        <span className="fw-500 text-orange-600 capitalize">{value}</span>
      </div>
    );
  }
  if (status === "cancelled" || status === "failed") {
    return (
      <div className="flex items-center gap-x-2">
        <span className="bg-red-600 w-4 h-4 circle"></span>
        <span className="fw-500 text-red-600 capitalize">{value}</span>
      </div>
    );
  }
  return <span className="capitalize">{value || "N/A"}</span>;
};

const StudentOrders = ({ studentId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getStudentOrders", studentId],
    queryFn: () => getStudentOrders(studentId),
    enabled: !!studentId,
  });

  // Endpoint may return the array directly or wrapped in { data }.
  const orders = Array.isArray(data) ? data : data?.data;

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor(
      (row) => row.course?.title ?? row.courseTitle ?? row.title,
      {
        id: "Course",
        cell: (info) => <>{info.getValue() ?? "N/A"}</>,
        header: (info) => info.column.id,
      }
    ),
    columnHelper.accessor((row) => row.amount ?? row.price ?? row.trx?.amount, {
      id: "Amount",
      cell: (info) =>
        info.getValue() != null ? <>{`$${info.getValue()}`}</> : <>N/A</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor(
      (row) => row.createdDate ?? row.createdAt ?? row.purchasedAt,
      {
        id: "Purchased On",
        cell: (info) =>
          info.getValue() ? (
            <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>
          ) : (
            <>N/A</>
          ),
        header: (info) => info.column.id,
      }
    ),
    columnHelper.accessor((row) => row.status ?? row.trx?.status, {
      id: "Status",
      cell: (info) => <StatusPill value={info.getValue()} />,
      header: (info) => info.column.id,
    }),
  ];

  if (isLoading) {
    return (
      <div className="place-center py-36">
        <Picker size={1.7} />
      </div>
    );
  }

  if (!orders || !orders.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        No purchased courses found for this student.
      </div>
    );
  }

  return <DataTable data={orders} columns={columns} />;
};

export default StudentOrders;
