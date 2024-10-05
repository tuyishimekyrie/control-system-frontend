// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { fetchUserLogs } from "../../services/LogsData";
// import axios from "axios";
// import { format } from "date-fns";

// export const WebActivity = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ["userLogs"],
//     queryFn: fetchUserLogs,
//     staleTime: Infinity,
//   });

//   if (isError) {
//     const errorMessage = axios.isAxiosError(error)
//       ? error.response?.data?.message || "Failed to load web activities"
//       : "An unexpected error occurred";
//     toast.error(errorMessage);
//   }

//   const activities = data
//     ? [...data].sort(
//         (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
//       )
//     : [];

//   const filteredActivities = activities.filter(
//     (activity) =>
//       activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       activity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       activity.url.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const paginatedActivities = filteredActivities.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

//   const formatDate = (dateStr: string) => {
//     return format(new Date(dateStr), "dd-MMM-yyyy");
//   };

//   return (
//     <div className="p-5 pt-0">
//       <div className="flex justify-between items-center mb-10 mt-8">
//         <div>
//           <h1 className="text-[25px] font-bold text-gray-400">
//             WEB ACTIVITIES
//           </h1>
//           <p className="text-green-600 text-[14px]">
//             Monitor and review user web activities in real-time.
//           </p>
//         </div>
//         <div className="flex justify-start">
//           <input
//             type="text"
//             placeholder="Search..."
//             style={{ backgroundColor: "#1F2A40" }}
//             className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto max-w-full">
//         {isLoading ? (
//           <p className="text-green-600 text-center">Loading activities...</p>
//         ) : (
//           <table className="min-w-[800px] w-full border-collapse table-fixed">
//             <thead className="text-[15px] font-bold">
//               <tr
//                 style={{ backgroundColor: "#1F2A45" }}
//                 className="text-gray-300"
//               >
//                 <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">
//                   Date
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[200px]">
//                   Name
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[250px]">
//                   Email Address
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[400px]">
//                   URL
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">
//                   Duration
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-[14px]">
//               {paginatedActivities.map((activity, index) => (
//                 <tr
//                   key={index}
//                   className="border border-gray-700 text-gray-400"
//                   style={{ backgroundColor: "#1F2A40" }}
//                 >
//                   <td className="border border-gray-700 p-3 whitespace-nowrap">
//                     {formatDate(activity.date)}
//                   </td>
//                   <td className="border border-gray-700 p-3 whitespace-nowrap">
//                     {activity.name}
//                   </td>
//                   <td className="border border-gray-700 p-3 whitespace-nowrap">
//                     {activity.email}
//                   </td>
//                   <td className="border border-gray-700 p-3 break-words">
//                     <a
//                       href={activity.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-green-600 underline"
//                     >
//                       {activity.url.length > 40
//                         ? `${activity.url.substring(0, 25)}...`
//                         : activity.url}
//                     </a>
//                   </td>
//                   <td className="border border-gray-700 p-3 whitespace-nowrap">
//                     {activity.duration}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <div className="flex justify-between items-center mt-3">
//         <div>
//           <p className="text-gray-400 text-[14px]">
//             Page <span className="text-green-600">{currentPage}</span> /{" "}
//             <span className="text-green-600">{totalPages}</span> of{" "}
//             <span className="text-green-600">{filteredActivities.length}</span>{" "}
//             records
//           </p>
//         </div>
//         <div className="flex space-x-2 text-[14px]">
//           <button
//             className={`p-2 rounded ${
//               currentPage === 1
//                 ? "bg-[#1F2A40] text-gray-500"
//                 : "bg-green-600 text-white hover:bg-green-700"
//             }`}
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Previous
//           </button>
//           <button
//             className={`p-2 rounded ${
//               currentPage === totalPages
//                 ? "bg-[#1F2A40] text-gray-500"
//                 : "bg-green-600 text-white hover:bg-green-700"
//             }`}
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchUserLogs } from "../../services/LogsData";
import axios from "axios";
import { format, isToday, subDays, isWithinInterval } from "date-fns";
import { RiFilter3Fill } from "react-icons/ri";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

export const WebActivity = () => {
  const initialFilter = localStorage.getItem("selectedFilter") || "Last 7 Days";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 7;

  const filterOptions = [
    { label: "All Time", value: "All Time" },
    { label: "Today", value: "Today" },
    { label: "A Week", value: "Last 7 Days" },
    { label: "A month", value: "Last 30 Days" },
  ];

  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popupRef, () => setFilterPopupVisible(false));

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setFilterPopupVisible(false);
    localStorage.setItem("selectedFilter", value);
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["schooluserLogs"],
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

  const applyDateFilter = (dateStr: string): boolean => {
    const date = new Date(dateStr);

    if (selectedFilter === "Today") {
      return isToday(date);
    } else if (selectedFilter === "Last 7 Days") {
      return isWithinInterval(date, {
        start: subDays(new Date(), 7),
        end: new Date(),
      });
    } else if (selectedFilter === "Last 30 Days") {
      return isWithinInterval(date, {
        start: subDays(new Date(), 30),
        end: new Date(),
      });
    }
    return true;
  };

  const filteredActivities = activities.filter(
    (activity) =>
      applyDateFilter(activity.date) &&
      (activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.url.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd-MMM-yyyy");
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    const pdf = new jsPDF("l", "mm", "tabloid");
    const input = document.getElementById("web-activity-content");

    if (input) {
      const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

      for (let page = 1; page <= totalPages; page++) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const currentPageActivities = filteredActivities.slice(
          startIndex,
          endIndex,
        );

        const tableHtml = `
          <div style="background-color: #161b2d; color: white; padding: 20px;">
            <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">${selectedFilter.toUpperCase()} ONLINE USER'S ACTIVITIES</h1>
            <p className="text-green-600 text-[14px]" style=" margin-bottom: 40px">
              This report shows the Monitored and reviewed ${selectedFilter.toUpperCase()} online user's web activities in real-time.
            </p>
            <table class="min-w-[800px] w-full border-collapse table-fixed">
              <thead class="text-[15px] font-bold">
                <tr style="background-color: #1F2A45;" class="text-gray-300">
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">Date</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[200px]">Name</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[250px]">Email Address</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[400px]">URL</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">Duration</th>
                </tr>
              </thead>
              <tbody class="text-[14px]">
                ${currentPageActivities
                  .map(
                    (activity) => `
                  <tr class="border border-gray-700 text-gray-400" style="background-color: #1F2A40;">
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${formatDate(activity.date)}</td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${activity.name}</td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${activity.email}</td>
                    <td class="border border-gray-700 p-3 break-words"><a href="${activity.url}" target="_blank" rel="noopener noreferrer" class="text-green-600 underline">${activity.url.length > 40 ? `${activity.url.substring(0, 25)}...` : activity.url}</a></td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${activity.duration}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = tableHtml;
        document.body.appendChild(tempDiv);

        await html2canvas(tempDiv, {
          backgroundColor: "#161b2d",
          scale: 2,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        });

        document.body.removeChild(tempDiv);

        if (page < totalPages) {
          pdf.addPage();
        }
      }

      pdf.save("Web Activity Report.pdf");
    }
    setIsExporting(false);
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
          <div
            className="flex items-center space-x-2 p-2 text-gray-200 bg-green-600 hover:bg-green-700 rounded-sm text-[16px] pr-3 pl-3 cursor-pointer ml-4"
            onClick={() => setFilterPopupVisible(!filterPopupVisible)}
          >
            <span className="text-[14px]">{selectedFilter}</span>
            <RiFilter3Fill />
          </div>
          {filterPopupVisible && (
            <div
              ref={popupRef}
              className="absolute top-16 right-5 text-gray-200 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
            >
              <div className="p-4 text-gray-200">
                <ul>
                  {filterOptions.map((option) => (
                    <li
                      key={option.value}
                      className="p-2 hover:bg-gray-700 text-gray-200 rounded cursor-pointer"
                      onClick={() => handleFilterChange(option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <button
            className="ml-4 p- text-gray-200 bg-blue-600 hover:bg-blue-700 rounded-sm text-[16px] pr-3 pl-3 cursor-pointer"
            onClick={exportAsPDF}
            disabled={isExporting} // Disable the button while exporting
          >
            {isExporting ? "Processing..." : "Export as PDF"}
          </button>
        </div>
      </div>

      <div id="web-activity-content" className="overflow-x-auto max-w-full">
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
