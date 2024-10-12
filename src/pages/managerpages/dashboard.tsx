import React, { useState, useRef, useEffect } from "react";
import { FcNext } from "react-icons/fc";
import { RiFilter3Fill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { fetchBlockedWebsite, fetchUsers } from "../../services/postData";
import { fetchUserLogs } from "../../services/LogsData";
import TopWebsitesChart from "../../components/AdminComponents/WebTimingChart";
import { Website } from "../../types/BlockWebsite";
import { format } from "date-fns";
import DashboardLocation from "../../components/ManagerComponents/DashboardLocation";

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

export const Dashboard = () => {
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Last 7 Days");

  const filterOptions = [
    { label: "Today", value: "Today" },
    { label: "A Week", value: "Last 7 Days" },
    { label: "A month", value: "Last 30 Days" },
  ];

  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popupRef, () => setFilterPopupVisible(false));

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setFilterPopupVisible(false);
  };

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: Infinity,
  });

  const {
    data: logsData,
    isLoading: isLogsLoading,
    isError: isLogsError,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchUserLogs,
    staleTime: Infinity,
  });

  const { data } = useQuery({
    queryKey: ["Website"],
    queryFn: fetchBlockedWebsite,
    staleTime: Infinity,
  });

  const blockedData: Website[] = data ?? [];

  if (isUsersError || isLogsError) {
    return <p className="text-red-600">Error fetching data</p>;
  }

  const userCount = usersData ? usersData.length : 0;
  const logCount = logsData ? 0 : 0;

  const recentBlockedWebsites = blockedData.slice(0, 9);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd-MMM-yyyy");
  };

  return (
    <div
      className="min-h-full text-white p-5 pt-0"
      style={{ backgroundColor: "#161b2d" }}
    >
      <div className="flex justify-end items-center mb-8">
        <div
          className="flex items-center space-x-2 p-2 bg-green-600 hover:bg-green-700 rounded-sm text-[16px] pr-3 pl-3 cursor-pointer"
          onClick={() => setFilterPopupVisible(!filterPopupVisible)}
        >
          <span className="text-[14px]">{selectedFilter}</span>
          <RiFilter3Fill />
        </div>
        {filterPopupVisible && (
          <div
            ref={popupRef}
            className="absolute top-16 right-5 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
          >
            <div className="p-4">
              <ul>
                {filterOptions.map((option) => (
                  <li
                    key={option.value}
                    className="p-2 hover:bg-gray-700 rounded cursor-pointer"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 col-span-2">
          <div
            className="p-6 rounded-sm"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-[16px] font-bold mr-4">Total Users</h2>
            </div>
            <div className="h-20 flex items-center justify-center text-5xl text-green-600">
              {isUsersLoading ? (
                <span className="text-[14px]">Loading...</span>
              ) : (
                userCount
              )}
            </div>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-[16px] font-bold mr-4">Total Logs</h2>
            </div>
            <div className="h-20 flex items-center justify-center text-5xl text-green-600">
              {isLogsLoading ? (
                <span className="text-[14px]">Loading...</span>
              ) : (
                logCount
              )}
            </div>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-[16px] font-bold mr-4">Total Blocked</h2>
            </div>
            <div className="h-20 flex items-center justify-center text-5xl text-green-600">
              {isLogsLoading ? (
                <span className="text-[14px]">Loading...</span>
              ) : (
                blockedData.length
              )}
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-sm lg:row-span-2"
          style={{ backgroundColor: "#1F2A40" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold mb-4">Recent Blocked Sites</h2>
            <FcNext />
          </div>
          <ul className="text-[14px]">
            {recentBlockedWebsites.map((website, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2"
              >
                <div className="flex-grow pr-4">
                  <p className="truncate">{website.name}</p>
                  <span className="text-red-600 text-[14px]">Blocked</span>
                </div>
                <span className="text-green-600 text-[14px]">
                  {formatDate(website.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-sm col-span-2 text-[14px] text-white p-3 flex justify-center"
          style={{ backgroundColor: "#1F2A40" }}
        >
          <TopWebsitesChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 col-span-3 ">
          <div
            className="p-6 rounded-sm "
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-start mb-8">
              <div className="flex items-center mr-16">
                <h2 className="text-[16px] font-bold mr-4">
                  Location Tracking
                </h2>
              </div>
            </div>
            <div className="h-[50vh] w-full ">
              <DashboardLocation />
            </div>
          </div>

          {/* <div
            className="p-6 rounded-sm lg:col-span-2"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-start mb-8">
              <div className="flex items-center mr-16">
                <h2 className="text-[16px] font-bold mr-4">
                  Content Filtering (Geographical)
                </h2>
              </div>
            </div>
            <div className="h-60"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
