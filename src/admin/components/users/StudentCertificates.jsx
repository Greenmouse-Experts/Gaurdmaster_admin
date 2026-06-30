import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { DataTable } from "../../../Components/table";
import Picker from "../../../Components/Loaders/Picker";
import { getStudentCertificates } from "../../../services/api/certificatesApi";

const StudentCertificates = ({ studentId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getStudentCertificates", studentId],
    queryFn: () => getStudentCertificates(studentId),
    enabled: !!studentId,
  });

  const certificates = Array.isArray(data) ? data : data?.data;

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row.certificateNumber, {
      id: "Certificate No.",
      cell: (info) => <span className="fw-500">{info.getValue()}</span>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.course?.title, {
      id: "Course",
      cell: (info) => <>{info.getValue() ?? "N/A"}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.issuedAt, {
      id: "Issued At",
      cell: (info) =>
        info.getValue() ? (
          <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>
        ) : (
          <>N/A</>
        ),
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
    columnHelper.accessor((row) => row.certificateUrl, {
      id: "Action",
      header: (info) => info.column.id,
      cell: (info) =>
        info.getValue() ? (
          <a
            href={info.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            View Certificate
          </a>
        ) : (
          <>N/A</>
        ),
    }),
  ];

  if (isLoading) {
    return (
      <div className="place-center py-36">
        <Picker size={1.7} />
      </div>
    );
  }

  if (!certificates || !certificates.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        No certificates found for this student.
      </div>
    );
  }

  return <DataTable data={certificates} columns={columns} />;
};

export default StudentCertificates;
