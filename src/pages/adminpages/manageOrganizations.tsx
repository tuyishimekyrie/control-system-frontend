/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import {
  fetchOrganizations,
  deleteOrganization,
} from "../../services/postData";
import UpdateOrganization from "../../components/AdminComponents/updateOrganization";

const ManageOrganizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

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

  const filteredOrganizations = organizations.filter((org) =>
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
            </div>
          </div>

          <div className="overflow-x-auto min-w-full">
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