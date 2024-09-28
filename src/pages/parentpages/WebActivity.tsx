import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchUserLogs } from "../../services/LogsData";
import axios from "axios";
import { format } from "date-fns";

export const WebActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["userLogs"],
    queryFn: fetchUserLogs,
    staleTime: Infinity,
  });

  if (isError) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "Failed to load web activities"
      : "An unexpected error occurred";
    toast.error(errorMessage);
  }

  const activities = data
    ? [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    : [];

  const filteredActivities = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.url.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd-MMM-yyyy");
  };

  return (
    <div className="p-5 pt-0">
      <div className="flex justify-between items-center mb-10 mt-8">
        <div>
          <h1 className="text-[25px] font-bold text-gray-400">
            WEB ACTIVITIES
          </h1>
          <p className="text-green-600 text-[14px]">
            Monitor and review user web activities in real-time.
          </p>
        </div>
        <div className="flex justify-start">
          <input
            type="text"
            placeholder="Search..."
            style={{ backgroundColor: "#1F2A40" }}
            className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto max-w-full">
        {isLoading ? (
          <p className="text-green-600 text-center">Loading activities...</p>
        ) : (
          <table className="min-w-[800px] w-full border-collapse table-fixed">
            <thead className="text-[15px] font-bold">
              <tr
                style={{ backgroundColor: "#1F2A45" }}
                className="text-gray-300"
              >
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">
                  Date
                </th>
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[200px]">
                  Name
                </th>
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[250px]">
                  Email Address
                </th>
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[400px]">
                  URL
                </th>
                <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {paginatedActivities.map((activity, index) => (
                <tr
                  key={index}
                  className="border border-gray-700 text-gray-400"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {formatDate(activity.date)}
                  </td>
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {activity.name}
                  </td>
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {activity.email}
                  </td>
                  <td className="border border-gray-700 p-3 break-words">
                    <a
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      {activity.url.length > 40
                        ? `${activity.url.substring(0, 25)}...`
                        : activity.url}
                    </a>
                  </td>
                  <td className="border border-gray-700 p-3 whitespace-nowrap">
                    {activity.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center mt-3">
        <div>
          <p className="text-gray-400 text-[14px]">
            Page <span className="text-green-600">{currentPage}</span> /{" "}
            <span className="text-green-600">{totalPages}</span> of{" "}
            <span className="text-green-600">{filteredActivities.length}</span>{" "}
            records
          </p>
        </div>
        <div className="flex space-x-2 text-[14px]">
          <button
            className={`p-2 rounded ${
              currentPage === 1
                ? "bg-[#1F2A40] text-gray-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className={`p-2 rounded ${
              currentPage === totalPages
                ? "bg-[#1F2A40] text-gray-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
