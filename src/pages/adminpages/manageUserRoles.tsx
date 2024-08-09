import { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";

const ManageUserRoles = () => {
  const users = [
    {
      name: "Aldo Twizerimana",
      email: "aldo@example.com",
      username: "aldo_t",
      role: "Admin",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      username: "john_d",
      role: "User",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      username: "jane_s",
      role: "Moderator",
    },
    {
      name: "Emily Johnson",
      email: "emily@example.com",
      username: "emily_j",
      role: "User",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 3;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

  return (
    <div className="p-5 pt-0">
      <div className="flex justify-between items-center mb-10 mt-8">
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
        </div>
      </div>

      <div className="overflow-x-scroll min-w-full">
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
              <th className="border border-gray-700 p-3 text-left max-w-[200px]">
                Username
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                Role
              </th>
              <th className="border border-gray-700 p-3 text-left max-w-[150px]">
                Manage User
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
                <td className="border border-gray-700 p-3">{user.username}</td>
                <td className="border border-gray-700 p-3">{user.role}</td>
                <td className="border border-gray-700 p-3 relative">
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
                      className="absolute right-[40%] mt-[3px] w-32 bg-gray-800 text-white rounded shadow-lg z-10"
                    >
                      <div
                        className="p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => console.log("Delete user", user.name)}
                      >
                        Delete
                      </div>
                      <div
                        className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                        onClick={() =>
                          console.log("Update role for", user.name)
                        }
                      >
                        Update Role
                      </div>
                    </div>
                  )}
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