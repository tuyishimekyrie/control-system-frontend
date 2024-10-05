// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { PiDotsThreeOutlineLight } from "react-icons/pi";
// import {
//   fetchOrganizations,
//   deleteOrganization,
// } from "../../services/postData";
// import UpdateOrganization from "../../components/AdminComponents/updateOrganization";

// const ManageOrganizations = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showPopup, setShowPopup] = useState<string | null>(null);
//   const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
//   const popupRef = useRef<HTMLDivElement>(null);
//   const itemsPerPage = 10;

//   const { data, error, isLoading, isError, refetch } = useQuery({
//     queryKey: ["organizations"],
//     queryFn: fetchOrganizations,
//     staleTime: Infinity,
//   });

//   if (isError) {
//     const errorMessage = axios.isAxiosError(error)
//       ? error.response?.data?.message || "Failed to load organizations"
//       : "An unexpected error occurred";
//     console.error(errorMessage);
//   }

//   const organizations = data || [];

//   const filteredOrganizations = organizations.filter((org) =>
//     org.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const paginatedOrganizations = filteredOrganizations.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node)
//       ) {
//         setShowPopup(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const onDeleteOrganization = async (id: string) => {
//     try {
//       await deleteOrganization(id);
//       toast.success("Organization Deleted Successfully");
//       setShowPopup(null);
//       await refetch();
//     } catch (error) {
//       toast.error("Error deleting organization");
//       console.error(error);
//       await refetch();
//     }
//   };

//   const onUpdateOrganization = (org: any) => {
//     setSelectedOrganization(org);
//     setShowPopup(null);
//   };

//   const handleCloseUpdate = () => {
//     setSelectedOrganization(null);
//   };

//   return (
//     <>
//       {selectedOrganization ? (
//         <UpdateOrganization
//           organization={selectedOrganization}
//           onClose={handleCloseUpdate}
//           refetchOrganizations={async () => {
//             await refetch();
//             handleCloseUpdate();
//           }}
//         />
//       ) : (
//         <div className="p-5 pt-0">
//           <div className="flex justify-between items-center mb-10 mt-8">
//             <Toaster />
//             <div>
//               <h1 className="text-[25px] font-bold text-gray-400">
//                 MANAGE ORGANIZATIONS
//               </h1>
//               <p className="text-green-600 text-[14px]">
//                 Monitor and Manage Platform's Registered Organizations.
//               </p>
//             </div>
//             <div className="flex justify-start">
//               <input
//                 type="text"
//                 placeholder="Search organizations..."
//                 style={{ backgroundColor: "#1F2A40" }}
//                 className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto min-w-full">
//             {isLoading ? (
//               <p className="text-green-600 text-center">
//                 Loading organizations...
//               </p>
//             ) : (
//               <table className="w-full border-collapse">
//                 <thead className="text-[15px] font-bold">
//                   <tr
//                     style={{ backgroundColor: "#1F2A45" }}
//                     className="text-gray-300"
//                   >
//                     <th className="border border-gray-700 p-3 text-left max-w-[50px]">
//                       #
//                     </th>
//                     <th className="border border-gray-700 p-3 text-left max-w-[200px]">
//                       Organization Name
//                     </th>
//                     <th className="border border-gray-700 p-3 text-left max-w-[150px]">
//                       Allocated Devices
//                     </th>
//                     <th className="border border-gray-700 p-3 text-left max-w-[150px]">
//                       Created At
//                     </th>
//                     <th className="border border-gray-700 p-3 text-left max-w-[150px]">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-300">
//                   {paginatedOrganizations.map((org, index) => (
//                     <tr key={org.id} className="text-sm">
//                       <td className="border border-gray-700 p-3">
//                         {index + 1}
//                       </td>
//                       <td className="border border-gray-700 p-3">{org.name}</td>
//                       <td className="border border-gray-700 p-3">
//                         {org.maxUsers}
//                       </td>
//                       <td className="border border-gray-700 p-3">
//                         {new Date(org.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="border border-gray-700 p-3">
//                         <div className="inline-block">
//                           <PiDotsThreeOutlineLight
//                             onClick={() => setShowPopup(org.id)}
//                             className="text-gray-300 cursor-pointer hover:text-gray-500 relative "
//                           />
//                           {showPopup === org.id && (
//                             <div
//                               ref={popupRef}
//                               className="absolute right-8 mt-[3px] w-32 bg-gray-800 text-white rounded shadow-lg z-10 "
//                             >
//                               <ul className="text-gray-300">
//                                 <li
//                                   className="px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white"
//                                   onClick={() => onDeleteOrganization(org.id)}
//                                 >
//                                   Delete
//                                 </li>
//                                 <li
//                                   className="px-4 py-2 cursor-pointer hover:bg-green-600 hover:text-white"
//                                   onClick={() => onUpdateOrganization(org)}
//                                 >
//                                   Update
//                                 </li>
//                               </ul>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           <div className="flex justify-between items-center mt-3">
//             <div>
//               <p className="text-gray-400 text-[14px]">
//                 Page{" "}
//                 <span className="text-green-600">
//                   {itemsPerPage * (currentPage - 1) + 1}
//                 </span>{" "}
//                 /{" "}
//                 <span className="text-green-600">
//                   {Math.min(
//                     itemsPerPage * currentPage,
//                     filteredOrganizations.length,
//                   )}
//                 </span>{" "}
//                 of{" "}
//                 <span className="text-green-600">
//                   {filteredOrganizations.length}
//                 </span>{" "}
//                 records
//               </p>
//             </div>
//             <div className="flex space-x-2 text-[14px]">
//               <button
//                 className={`p-2 rounded ${
//                   currentPage === 1
//                     ? "bg-[#1F2A40] text-gray-500"
//                     : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//               >
//                 Previous
//               </button>
//               <button
//                 className={`p-2 rounded ${
//                   currentPage === totalPages
//                     ? "bg-[#1F2A40] text-gray-500"
//                     : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ManageOrganizations;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { RiFilter3Fill } from "react-icons/ri";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  fetchOrganizations,
  deleteOrganization,
} from "../../services/postData";
import UpdateOrganization from "../../components/AdminComponents/updateOrganization";
import { isToday, subDays, isWithinInterval } from "date-fns";

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

const ManageOrganizations = () => {
  const initialFilter = localStorage.getItem("selectedFilter") || "All Time";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const itemsPerPage = 20;
  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, () => setFilterPopupVisible(false));

  const filterOptions = [
    { label: "All Time", value: "All Time" },
    { label: "Today", value: "Today" },
    { label: "A Week", value: "Last 7 Days" },
    { label: "A month", value: "Last 30 Days" },
  ];

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setFilterPopupVisible(false);
    localStorage.setItem("selectedFilter", value);
  };

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
    staleTime: Infinity,
  });

  if (isError) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "Failed to load organizations"
      : "An unexpected error occurred";
    console.error(errorMessage);
  }

  const organizations = data || [];

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

  const filteredOrganizations = organizations.filter(
    (org) =>
      applyDateFilter(org.createdAt) &&
      org.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onDeleteOrganization = async (id: string) => {
    try {
      await deleteOrganization(id);
      toast.success("Organization Deleted Successfully");
      setShowPopup(null);
      await refetch();
    } catch (error) {
      toast.error("Error deleting organization");
      console.error(error);
      await refetch();
    }
  };

  const onUpdateOrganization = (org: any) => {
    setSelectedOrganization(org);
    setShowPopup(null);
  };

  const handleCloseUpdate = () => {
    setSelectedOrganization(null);
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    const pdf = new jsPDF("l", "mm", "tabloid");
    const input = document.getElementById("organization-content");

    if (input) {
      const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);

      for (let page = 1; page <= totalPages; page++) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const currentPageOrganizations = filteredOrganizations.slice(
          startIndex,
          endIndex,
        );

        const tableHtml = `
          <div style="background-color: #161b2d; color: white; padding: 20px;">
            <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">${selectedFilter.toUpperCase()} REGISTERED ORGANIZATIONS</h1>
            <p className="text-green-600 text-[14px]" style=" margin-bottom: 40px">
              This report shows the Monitored and reviewed ${selectedFilter.toUpperCase()} registered organizations in real-time.
            </p>
            <table class="min-w-[800px] w-full border-collapse table-fixed">
              <thead class="text-[15px] font-bold">
                <tr style="background-color: #1F2A45;" class="text-gray-300">
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[50px]">#</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[200px]">Organization Name</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">Allocated Devices</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">Created At</th>
                </tr>
              </thead>
              <tbody class="text-[14px]">
                ${currentPageOrganizations
                  .map(
                    (org) => `
                  <tr class="border border-gray-700 text-gray-400" style="background-color: #1F2A40;">
                  <td className="border border-gray-700 p-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 rounded text-green-600 bg-gray-700 border-gray-600"
                    />
                  </td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${org.name}</td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${org.maxUsers}</td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${new Date(org.createdAt).toLocaleDateString()}</td>
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

      pdf.save("Registered Organizations Report.pdf");
    }
    setIsExporting(false);
  };

  return (
    <>
      {selectedOrganization ? (
        <UpdateOrganization
          organization={selectedOrganization}
          onClose={handleCloseUpdate}
          refetchOrganizations={async () => {
            await refetch();
            handleCloseUpdate();
          }}
        />
      ) : (
        <div className="p-5 pt-0">
          <div className="flex justify-between items-center mb-10 mt-8">
            <Toaster />
            <div>
              <h1 className="text-[25px] font-bold text-gray-400">
                MANAGE ORGANIZATIONS
              </h1>
              <p className="text-green-600 text-[14px]">
                Monitor and Manage Platform's Registered Organizations.
              </p>
            </div>
            <div className="flex justify-start">
              <input
                type="text"
                placeholder="Search organizations..."
                style={{ backgroundColor: "#1F2A40" }}
                className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="ml-4 p- text-gray-200 bg-blue-600 hover:bg-blue-700 rounded-sm text-[16px] pr-3 pl-3 cursor-pointer"
                onClick={exportAsPDF}
                disabled={isExporting}
              >
                {isExporting ? "Processing..." : "Export as PDF"}
              </button>
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
            </div>
          </div>

          <div id="organization-content" className="overflow-x-auto min-w-full">
            {isLoading ? (
              <p className="text-green-600 text-center">
                Loading organizations...
              </p>
            ) : (
              <table className="w-full border-collapse">
                <thead className="text-[15px] font-bold">
                  <tr
                    style={{ backgroundColor: "#1F2A45" }}
                    className="text-gray-300"
                  >
                    <th className="border border-gray-700 p-3 text-left max-w-[50px]">
                      #
                    </th>
                    <th className="border border-gray-700 p-3 text-left max-w-[200px]">
                      Organization Name
                    </th>
                    <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                      Allocated Devices
                    </th>
                    <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                      Created At
                    </th>
                    <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {paginatedOrganizations.map((org, index) => (
                    <tr key={org.id} className="text-sm">
                      <td className="border border-gray-700 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-700 p-3">{org.name}</td>
                      <td className="border border-gray-700 p-3">
                        {org.maxUsers}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {new Date(org.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-700 p-3">
                        <div className="inline-block">
                          <PiDotsThreeOutlineLight
                            onClick={() => setShowPopup(org.id)}
                            className="text-gray-300 cursor-pointer hover:text-gray-500 relative "
                          />
                          {showPopup === org.id && (
                            <div
                              ref={popupRef}
                              className="absolute right-8 mt-[3px] w-32 bg-gray-800 text-white rounded shadow-lg z-10 "
                            >
                              <ul className="text-gray-300">
                                <li
                                  className="px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white"
                                  onClick={() => onDeleteOrganization(org.id)}
                                >
                                  Delete
                                </li>
                                <li
                                  className="px-4 py-2 cursor-pointer hover:bg-green-600 hover:text-white"
                                  onClick={() => onUpdateOrganization(org)}
                                >
                                  Update
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
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
                Page{" "}
                <span className="text-green-600">
                  {itemsPerPage * (currentPage - 1) + 1}
                </span>{" "}
                /{" "}
                <span className="text-green-600">
                  {Math.min(
                    itemsPerPage * currentPage,
                    filteredOrganizations.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="text-green-600">
                  {filteredOrganizations.length}
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
      )}
    </>
  );
};

export default ManageOrganizations;
