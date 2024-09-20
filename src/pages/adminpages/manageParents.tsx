/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { fetchParents, deleteParent } from "../../services/postData";
import UpdateParent from "../../components/AdminComponents/updateParents";

const ManageParents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["parents"],
    queryFn: fetchParents,
    staleTime: Infinity,
  });

  if (isError) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "Failed to load parents"
      : "An unexpected error occurred";
    console.error(errorMessage);
  }

  const parents = data || [];

  const filteredParents = parents.filter((parent) =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedParents = filteredParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);

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

  const onDeleteParent = async (id: string) => {
    try {
      await deleteParent(id);
      toast.success("Parent Deleted Successfully");
      setShowPopup(null);
      await refetch();
    } catch (error) {
      toast.error("Error deleting parent");
      console.error(error);
      await refetch();
    }
  };

  const onUpdateParent = (parent: any) => {
    setSelectedParent(parent);
    setShowPopup(null);
  };

  const handleCloseUpdate = () => {
    setSelectedParent(null);
  };

  return (
    <>
      {selectedParent ? (
        <UpdateParent
          parent={selectedParent}
          onClose={handleCloseUpdate}
          refetchParents={async () => {
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
                MANAGE PARENTS
              </h1>
              <p className="text-green-600 text-[14px]">
                Monitor and Manage Platform's Registered Parents.
              </p>
            </div>
            <div className="flex justify-start">
              <input
                type="text"
                placeholder="Search parents..."
                style={{ backgroundColor: "#1F2A40" }}
                className="p-2 border border-gray-700 rounded-sm focus:outline-none w-30 md:w-40 lg:w-60 text-[14px] text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto min-w-full">
            {isLoading ? (
              <p className="text-green-600 text-center">Loading parents...</p>
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
                      Parent Name
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
                  {paginatedParents.map((parent, index) => (
                    <tr key={parent.id} className="text-sm">
                      <td className="border border-gray-700 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {parent.name}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {parent.maxUsers}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {new Date(parent.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-700 p-3">
                        <div className="inline-block">
                          <PiDotsThreeOutlineLight
                            onClick={() => setShowPopup(parent.id)}
                            className="text-gray-300 cursor-pointer hover:text-gray-500 relative "
                          />
                          {showPopup === parent.id && (
                            <div
                              ref={popupRef}
                              className="absolute right-8 mt-[3px] w-32 bg-gray-800 text-white rounded shadow-lg z-10 "
                            >
                              <ul className="text-gray-300">
                                <li
                                  className="px-4 py-2 cursor-pointer hover:bg-red-600 hover:text-white"
                                  onClick={() => onDeleteParent(parent.id)}
                                >
                                  Delete
                                </li>
                                <li
                                  className="px-4 py-2 cursor-pointer hover:bg-green-600 hover:text-white"
                                  onClick={() => onUpdateParent(parent)}
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
                  {Math.min(itemsPerPage * currentPage, filteredParents.length)}
                </span>{" "}
                of{" "}
                <span className="text-green-600">{filteredParents.length}</span>{" "}
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

export default ManageParents;
