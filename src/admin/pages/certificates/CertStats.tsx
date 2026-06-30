import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../services/api/authApi";
import { FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import Picker from "../../../Components/Loaders/Picker";

interface PerCourseStat {
  courseTitle: string;
  count: string | number;
}

interface CertStatsData {
  totalCertificates: number;
  certificatesThisMonth: number;
  certificatesThisYear: number;
  perCourse: PerCourseStat[];
}

export default function CertStats(props: any) {
  const query = useQuery({
    queryKey: ["certStats"],
    queryFn: async () => {
      let resp = await apiClient.get("/certificates/stats");
      return resp.data;
    },
  });

  const stats: CertStatsData = query.data || {};

  if (query.isLoading) {
    return (
      <div className="place-center py-12">
        <Picker size={1.7} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Certificates</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {stats.totalCertificates ?? 0}
            </h3>
          </div>
          <span className="bg-[#1a2744] text-white text-3xl p-4 rounded-xl flex items-center justify-center">
            <HiOutlineDocumentCheck />
          </span>
        </div>
        <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">This Month</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {stats.certificatesThisMonth ?? 0}
            </h3>
          </div>
          <span className="bg-[#1a2744] text-white text-3xl p-4 rounded-xl flex items-center justify-center">
            <FaRegCalendar />
          </span>
        </div>
        <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">This Year</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {stats.certificatesThisYear ?? 0}
            </h3>
          </div>
          <span className="bg-[#1a2744] text-white text-3xl p-4 rounded-xl flex items-center justify-center">
            <FaRegCalendarAlt />
          </span>
        </div>
      </div>

      {!!stats.perCourse?.length && (
        <div className="mt-6">
          <h2>Certificates Per Course</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100 mt-2">
            {stats.perCourse.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-x-3">
                  <span className="bg-[#1a2744] text-white text-lg p-3 rounded-xl flex items-center justify-center">
                    <GiBookshelf />
                  </span>
                  <p className="fw-500 text-gray-800">{item.courseTitle}</p>
                </div>
                <p className="text-lg font-bold text-gray-800">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
