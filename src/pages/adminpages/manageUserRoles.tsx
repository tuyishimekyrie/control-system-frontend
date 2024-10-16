// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { PiDotsThreeOutlineLight } from "react-icons/pi";
// import {
//   deleteUser,
//   fetchUsers,
//   updateRole,
//   updateSubscription,
// } from "../../services/postData";

// const ManageUserRoles = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showPopup, setShowPopup] = useState<number | null>(null);
//   const popupRef = useRef<HTMLDivElement>(null);
//   const itemsPerPage = 10;

//   const { data, error, isLoading, isError, refetch } = useQuery({
//     queryKey: ["allusers"],
//     queryFn: fetchUsers,
//     staleTime: Infinity,
//   });

//   if (isError) {
//     const errorMessage = axios.isAxiosError(error)
//       ? error.response?.data?.message || "Failed to load users"
//       : "An unexpected error occurred";
//     console.error(errorMessage);
//   }

//   const users = data || [];
//   console.log(users);

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.role.toLowerCase().includes(searchTerm.toLowerCase()),
//   );
//   console.log(filteredUsers);

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
//   const onUpdateSubscription = (id: string) => {
//     const data = updateSubscription(id);
//     data
//       .then(() => {
//         toast.success("User Updated Successfully");
//         refetch();
//       })
//       .catch((error) => {
//         toast.error("error", error);
//         refetch();
//       });
//   };
//   const onDeleteUser = (id: string) => {
//     const data = deleteUser(id);
//     data
//       .then(() => {
//         toast.success("User Deleted Successfully");
//         refetch();
//       })
//       .catch((error) => {
//         toast.error("error", error);
//         refetch();
//       });
//   };
//   const onUpdateRole = (id: string, role: string) => {
//     let data;
//     if (role == "user") {
//       data = updateRole(id, { role: "manager" });
//     } else {
//       data = updateRole(id, { role: "user" });
//     }
//     data
//       .then(() => {
//         toast.success("User Updated Successfully");
//         refetch();
//       })
//       .catch((error) => {
//         toast.error("error", error);
//         refetch();
//       });
//   };
//   return (
//     <div className="p-5 pt-0">
//       <div className="flex justify-between items-center mb-10 mt-8">
//         <Toaster />
//         <div>
//           <h1 className="text-[25px] font-bold text-gray-400">
//             REGISTERED USERS
//           </h1>
//           <p className="text-green-600 text-[14px]">
//             Monitor and Manage Platform's Registered Users.
//           </p>
//         </div>
//         <div className="flex justify-start">
//           <input
//             type="text"
//             placeholder="Try typing..."
//             style={{ backgroundColor: "#1F2A40" }}
//             className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto min-w-full">
//         {isLoading ? (
//           <p className="text-green-600 text-center">Loading users...</p>
//         ) : (
//           <table className="w-full border-collapse">
//             <thead className="text-[15px] font-bold">
//               <tr
//                 style={{ backgroundColor: "#1F2A45" }}
//                 className="text-gray-300"
//               >
//                 <th className="border border-gray-700 p-3 text-left max-w-[50px]">
//                   #
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left max-w-[200px]">
//                   Name
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left max-w-[250px]">
//                   Email Address
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left max-w-[150px]">
//                   Role
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left max-w-[150px]">
//                   Subscribed
//                 </th>
//                 <th className="border border-gray-700 p-3 text-left max-w-[150px]">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-[14px]">
//               {paginatedUsers.map((user, index) => (
//                 <tr
//                   key={index}
//                   className="border border-gray-700 text-gray-400"
//                   style={{ backgroundColor: "#1F2A40" }}
//                 >
//                   <td className="border border-gray-700 p-3">
//                     <input
//                       type="checkbox"
//                       className="form-checkbox h-4 w-4 rounded text-green-600 bg-gray-700 border-gray-600"
//                     />
//                   </td>
//                   <td className="border border-gray-700 p-3">{user.name}</td>
//                   <td className="border border-gray-700 p-3">{user.email}</td>
//                   <td className="border border-gray-700 p-3">{user.role}</td>
//                   <td className="border border-gray-700 p-3">
//                     {user.isSubscribed ? (
//                       <span className="bg-green-500 text-white px-2 py-1 rounded-full">
//                         Active
//                       </span>
//                     ) : (
//                       <span className="bg-red-500 text-white px-2 py-1 rounded-full">
//                         Not Active
//                       </span>
//                     )}
//                   </td>
//                   <td className="border border-gray-700 pl-3 relative ">
//                     <button
//                       onClick={() =>
//                         setShowPopup(showPopup === index ? null : index)
//                       }
//                       className="text-gray-400 hover:text-green-600"
//                     >
//                       <PiDotsThreeOutlineLight size={20} />
//                     </button>
//                     {showPopup === index && (
//                       <div
//                         ref={popupRef}
//                         className="absolute right-[40%] mt-[3px] w-32 bg-gray-800 text-white rounded shadow-lg z-10 "
//                       >
//                         <div
//                           className="p-2 hover:bg-red-600 hover:text-white cursor-pointer"
//                           onClick={() => onDeleteUser(user.id)}
//                         >
//                           Delete
//                         </div>
//                         <div
//                           className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
//                           onClick={() => onUpdateRole(user.id, user.role)}
//                         >
//                           Update Role
//                         </div>
//                         <div
//                           className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
//                           onClick={() => onUpdateSubscription(user.id)}
//                         >
//                           {user.isSubscribed ? "Revoke Access" : "Grant Access"}
//                         </div>
//                       </div>
//                     )}
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
//             Page{" "}
//             <span className="text-green-600">
//               {itemsPerPage * (currentPage - 1) + 1}
//             </span>{" "}
//             /{" "}
//             <span className="text-green-600">
//               {Math.min(itemsPerPage * currentPage, filteredUsers.length)}
//             </span>{" "}
//             of <span className="text-green-600">{filteredUsers.length}</span>{" "}
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

// export default ManageUserRoles;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { RiFilter3Fill } from "react-icons/ri";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  deleteUser,
  fetchUsers,
  updateRole,
  updateSubscription,
} from "../../services/postData";
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

const ManageUserRoles = () => {
  const initialFilter = localStorage.getItem("selectedFilter") || "All Time";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<number | null>(null);
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 20;

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

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["allusers"],
    queryFn: fetchUsers,
    staleTime: Infinity,
  });

  if (isError) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "Failed to load users"
      : "An unexpected error occurred";
    console.error(errorMessage);
  }

  const users = data || [];

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

  const filteredUsers = users.filter(
    (user) =>
      applyDateFilter(user.createdAt) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

  const onUpdateSubscription = (id: string) => {
    const data = updateSubscription(id);
    data
      .then(() => {
        toast.success("User Updated Successfully");
        refetch();
      })
      .catch((error) => {
        toast.error("error", error);
        refetch();
      });
  };

  const onDeleteUser = (id: string) => {
    const data = deleteUser(id);
    data
      .then(() => {
        toast.success("User Deleted Successfully");
        refetch();
      })
      .catch((error) => {
        toast.error("error", error);
        refetch();
      });
  };

  const onUpdateRole = (id: string, role: string) => {
    let data;
    if (role == "user") {
      data = updateRole(id, { role: "manager" });
    } else {
      data = updateRole(id, { role: "user" });
    }
    data
      .then(() => {
        toast.success("User Updated Successfully");
        refetch();
      })
      .catch((error) => {
        toast.error("error", error);
        refetch();
      });
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    const pdf = new jsPDF("l", "mm", "tabloid");
    const input = document.getElementById("user-roles-content");

    if (input) {
      const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

      for (let page = 1; page <= totalPages; page++) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const currentPageUsers = filteredUsers.slice(startIndex, endIndex);

        const tableHtml = `
          <div style="background-color: #161b2d; color: white; padding: 20px;">
            <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">${selectedFilter.toUpperCase()} REGISTERED USERS</h1>
            <p className="text-green-600 text-[14px]" style=" margin-bottom: 40px">
              This report shows the Monitored and reviewed ${selectedFilter.toUpperCase()} registered users in real-time.
            </p>
            <table class="min-w-[800px] w-full border-collapse table-fixed">
              <thead class="text-[15px] font-bold">
                <tr style="background-color: #1F2A45;" class="text-gray-300">
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[50px]">#</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[200px]">Name</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[250px]">Email Address</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">Role</th>
                  <th class="border border-gray-700 p-3 text-left whitespace-nowrap max-w-[150px]">Subscribed</th>
                </tr>
              </thead>
              <tbody class="text-[14px]">
                ${currentPageUsers
                  .map(
                    (user) => `
                  <tr class="border border-gray-700 text-gray-400" style="background-color: #1F2A40;">
                  <td className="border border-gray-700 p-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 rounded text-green-600 bg-gray-700 border-gray-600"
                    />
                  </td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${user.name}</td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${user.email}</td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${user.role}</td>
                    <td class="border border-gray-700 p-3 whitespace-nowrap">${user.isSubscribed ? "Active" : "Not Active"}</td>
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

      pdf.save("Registered Users Report.pdf");
    }
    setIsExporting(false);
  };

  return (
    <div className="p-5 pt-0">
      <div className="flex justify-between items-center mb-10 mt-8">
        <Toaster />
        <div>
          <h1 className="text-[25px] font-bold text-gray-400">
            REGISTERED USERS
          </h1>
          <p className="text-green-600 text-[14px]">
            Monitor and Manage Platform's Registered Users.
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

      <div id="user-roles-content" className="overflow-x-auto min-w-full">
        {isLoading ? (
          <p className="text-green-600 text-center">Loading users...</p>
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
                  Name
                </th>
                <th className="border border-gray-700 p-3 text-left max-w-[250px]">
                  Email Address
                </th>
                <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                  Role
                </th>
                <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                  Subscribed
                </th>
                <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {paginatedUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border border-gray-700 text-gray-400"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  <td className="border border-gray-700 p-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 rounded text-green-600 bg-gray-700 border-gray-600"
                    />
                  </td>
                  <td className="border border-gray-700 p-3">{user.name}</td>
                  <td className="border border-gray-700 p-3">{user.email}</td>
                  <td className="border border-gray-700 p-3">{user.role}</td>
                  <td className="border border-gray-700 p-3">
                    {user.isSubscribed ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                        Not Active
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-700 pl-3 relative ">
                    <button
                      onClick={() =>
                        setShowPopup(showPopup === index ? null : index)
                      }
                      className="text-gray-400 hover:text-green-600"
                    >
                      <PiDotsThreeOutlineLight size={20} />
                    </button>
                    {showPopup === index && (
                      <div
                        ref={popupRef}
                        className="absolute right-[40%] mt-[3px] w-32 bg-gray-800 text-white rounded shadow-lg z-10 "
                      >
                        <div
                          className="p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                          onClick={() => onDeleteUser(user.id)}
                        >
                          Delete
                        </div>
                        <div
                          className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                          onClick={() => onUpdateRole(user.id, user.role)}
                        >
                          Update Role
                        </div>
                        <div
                          className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                          onClick={() => onUpdateSubscription(user.id)}
                        >
                          {user.isSubscribed ? "Revoke Access" : "Grant Access"}
                        </div>
                      </div>
                    )}
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
              {Math.min(itemsPerPage * currentPage, filteredUsers.length)}
            </span>{" "}
            of <span className="text-green-600">{filteredUsers.length}</span>{" "}
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

export default ManageUserRoles;
