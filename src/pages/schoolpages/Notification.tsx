import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchManagerNotifications } from "../../services/postData";

const SchoolNotification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: () => fetchManagerNotifications(),
  });

  if (isError) {
    return <h1 className="text-green-600 text-center">Error Occurred</h1>;
  }

  if (isLoading) {
    return <h1 className="text-green-600 text-center">Loading...</h1>;
  }

  const notifications = data?.notifications || [];

  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  return (
    <div className="text-white flex items-left flex-col px-10">
      <div className="flex justify-between items-center mb-10 mt-8">
        <div>
          <h1 className="text-[25px] font-bold text-gray-400">NOTIFICATIONS</h1>
          <p className="text-green-600 text-[14px]">
            Monitor and Manage Your registered device's alerts.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search notifications..."
          style={{ backgroundColor: "#1F2A40" }}
          className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {paginatedNotifications.map((notificationMsg) => (
        <div
          key={notificationMsg.id}
          className={`border-l-4 border-l-green-600 border border-gray-500 p-4 mb-4 flex items-center rounded-md`}
        >
          <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
            {notificationMsg.message.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-gray-400 text-sm">{notificationMsg.message}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-3">
        <div>
          <p className="text-gray-400 text-[14px]">
            Page{" "}
            <span className="text-green-600">
              {itemsPerPage * (currentPage - 1) + 1}
            </span>{" "}
            /{" "}
            <span className="text-green-600">
              {Math.min(
                itemsPerPage * currentPage,
                filteredNotifications.length,
              )}
            </span>{" "}
            of{" "}
            <span className="text-green-600">
              {filteredNotifications.length}
            </span>{" "}
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

export default SchoolNotification;
