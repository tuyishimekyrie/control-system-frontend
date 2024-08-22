import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicIP } from "../../utils/admin/ipUtils";
import { FaPlus } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom"; // Import Link component

interface FilterData {
  categories: string[];
  keywords: string[];
  blockedURLs: string[];
}

// Fetch function using fetch
const fetchFilterData = async (): Promise<FilterData> => {
  const ipAddress = await getPublicIP(); // Fetch the IP address
  console.log("ipAddress", ipAddress);
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/filter-url`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Test: React.FC = () => {
  const {
    data: filterData,
    error,
    isLoading,
  } = useQuery<FilterData>({
    queryKey: ["filterData"],
    queryFn: fetchFilterData,
  });

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#161b2d" }}
      >
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#161b2d" }}
      >
        <span>{(error as Error).message}</span>
      </div>
    );
  }

  // Safely access properties using optional chaining
  return (
    <div
      className="min-h-screen text-white p-6"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-lg shadow-md p-4"
          style={{ backgroundColor: "#161b2d" }}
        >
          <h2 className="text-xl font-semibold mb-4">Filter Settings</h2>
          {/* Action Buttons */}
          <div className="mb-4 flex gap-4">
            <Link
              to="/admin/add-blocked-url"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            >
              <FaPlus className="inline mr-2" />
              Add Blocked URLs
            </Link>
            <Link
              to="/admin/add-category"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            >
              <FaPlus className="inline mr-2" />
              Add Category
            </Link>
            <Link
              to="/admin/add-keyword"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
            >
              <FaPlus className="inline mr-2" />
              Add Keyword
            </Link>
          </div>
          <table className="min-w-full divide-y mt-10">
            <thead className="text-[15px] font-bold">
              <tr
                style={{ backgroundColor: "#1F2A45" }}
                className="text-gray-300"
              >
                <th className="border border-gray-700 p-3 text-left">Type</th>
                <th className="border border-gray-700 p-3 text-left">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              <tr>
                <td
                  className="border border-gray-700 text-gray-400 p-3"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  Blocked URLs
                </td>
                <td
                  className="border border-gray-700 text-gray-400 p-3"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  <ul className="flex flex-wrap gap-4">
                    {filterData?.blockedURLs?.length ? (
                      filterData.blockedURLs.map((url, index) => (
                        <li key={index} className="py-1">
                          {url}
                        </li>
                      ))
                    ) : (
                      <li>No URLs available</li>
                    )}
                  </ul>
                </td>
              </tr>
              <tr>
                <td
                  className="border border-gray-700 text-gray-400 p-3"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  Categories
                </td>
                <td
                  className="border border-gray-700 text-gray-400 p-3"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  <ul className="flex gap-4 flex-wrap">
                    {filterData?.categories?.length ? (
                      filterData.categories.map((category, index) => (
                        <li key={index} className="py-1">
                          {category}
                        </li>
                      ))
                    ) : (
                      <li>No categories available</li>
                    )}
                  </ul>
                </td>
              </tr>
              <tr>
                <td
                  className="border border-gray-700 text-gray-400 p-3"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  Keywords
                </td>
                <td
                  className="border border-gray-700 text-gray-400 p-3"
                  style={{ backgroundColor: "#1F2A40" }}
                >
                  <ul className="flex gap-4 flex-wrap">
                    {filterData?.keywords?.length ? (
                      filterData.keywords.map((keyword, index) => (
                        <li key={index} className="py-1">
                          {keyword}
                        </li>
                      ))
                    ) : (
                      <li>No keywords available</li>
                    )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Test;
