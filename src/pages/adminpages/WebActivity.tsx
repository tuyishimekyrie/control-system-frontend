import { useState } from "react";

const WebActivity = () => {
  const activities = [
    {
      date: "2024-08-08",
      name: "Aldo Twizerimana",
      email: "aldo@example.com",
      url: "https://example.com",
      category: "Social Media",
      action: "Visited",
      duration: "5 minutes",
      region: "Rwanda",
    },
    {
      date: "2024-08-08",
      name: "Aldo Twizerimana",
      email: "aldo@example.com",
      url: "https://inappropriate.com",
      category: "Inappropriate Content",
      action: "Blocked",
      duration: "N/A",
      region: "Rwanda",
    },
    {
      date: "2024-08-08",
      name: "Aldo Twizerimana",
      email: "aldo@example.com",
      url: "https://another-site.com",
      category: "News",
      action: "Visited",
      duration: "10 minutes",
      region: "Rwanda",
    },
    {
      date: "2024-08-08",
      name: "Aldo Twizerimana",
      email: "aldo@example.com",
      url: "https://another-bad-site.com",
      category: "Inappropriate Content",
      action: "Blocked",
      duration: "N/A",
      region: "Rwanda",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredActivities = activities.filter(
    (activity) =>
      activity.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

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
            placeholder="Try typing..."
            style={{ backgroundColor: "#1F2A40" }}
            className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-scroll min-w-full">
        <table className="w-full border-collapse">
          <thead className="text-[15px] font-bold">
            <tr
              style={{ backgroundColor: "#1F2A45" }}
              className="text-gray-300"
            >
              <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                Date
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[200px]">
                Name
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[250px]">
                Email Address
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[250px]">
                URL
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[200px]">
                Category
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                Action
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                Duration
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                Region
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
                <td className="border border-gray-700 p-3">{activity.date}</td>
                <td className="border border-gray-700 p-3">{activity.name}</td>
                <td className="border border-gray-700 p-3">{activity.email}</td>
                <td className="border border-gray-700 p-3">{activity.url}</td>
                <td className="border border-gray-700 p-3">
                  {activity.category}
                </td>
                <td className="border border-gray-700 p-3">
                  {activity.action}
                </td>
                <td className="border border-gray-700 p-3">
                  {activity.duration}
                </td>
                <td className="border border-gray-700 p-3">
                  {activity.region}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div>
          <p className="text-gray-400 text-[14px]">
            Page{" "}
            <span className="text-green-600">
              {itemsPerPage * (currentPage - 1) + 1}
            </span>{" "}
            /{" "}
            <span className="text-green-600">
              {Math.min(itemsPerPage * currentPage, filteredActivities.length)}
            </span>{" "}
            of{" "}
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

export default WebActivity;
