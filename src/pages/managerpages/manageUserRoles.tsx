/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import {
  deleteUser,
  fetchUsers,
  updateSubscription,
} from "../../services/postData";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddUsers from "../../components/ManagerComponents/AddUsers";
import UpdateUser from "../../components/ManagerComponents/updateUser";

export const ManageUserRoles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
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
        setShowPopup(null);
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

  const onUpdateUser = (user: any) => {
    setSelectedUser(user);
    setShowUpdateUserForm(true);
    setShowPopup(null);
  };

  const handleCloseUpdate = () => {
    setSelectedUser(null);
    setShowUpdateUserForm(false);
  };

  return (
    <>
      {showAddUserForm ? (
        <AddUsers
          setShowAddUserForm={setShowAddUserForm}
          refetchUsers={refetch}
        />
      ) : showUpdateUserForm ? (
        <UpdateUser
          user={selectedUser}
          onClose={handleCloseUpdate}
          refetchUsers={refetch}
        />
      ) : (
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
                className="flex items-center px-4 text-[14px] py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
                onClick={() => setShowAddUserForm(true)}
              >
                <IoIosAddCircleOutline className="mr-2" />
                Add Users
              </button>
            </div>
          </div>

          <div className="overflow-x-auto min-w-full">
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
                      Ip Address
                    </th>
                    <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                      Mac Address
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
                      <td className="border border-gray-700 p-3">
                        {user.name}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {user.email}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {user.role}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {user.ipAddress}
                      </td>
                      <td className="border border-gray-700 p-3">
                        {user.macAddress}
                      </td>
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
                            className="absolute right-[40%] mt-[3px] w-32 bg-gray-800 text-white rounded shadow-lg z-100 "
                          >
                            <div
                              className="p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                              onClick={() => onDeleteUser(user.id)}
                            >
                              Delete
                            </div>
                            <div
                              className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                              onClick={() => onUpdateUser(user)}
                            >
                              Update
                            </div>
                            <div
                              className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                              onClick={() => onUpdateSubscription(user.id)}
                            >
                              {user.isSubscribed
                                ? "Revoke Access"
                                : "Grant Access"}
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
                of{" "}
                <span className="text-green-600">{filteredUsers.length}</span>{" "}
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
