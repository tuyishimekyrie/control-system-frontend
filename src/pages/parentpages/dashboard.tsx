import React, { useState, useRef, useEffect } from "react";
import { FcNext } from "react-icons/fc";
import { RiFilter3Fill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { fetchBlockedWebsite, fetchUsers } from "../../services/postData";
import { fetchUserLogs } from "../../services/LogsData";
import TopWebsitesChart from "../../components/ParentComponents/WebTimingChart";
import { Website } from "../../types/BlockWebsite";
import { format, isToday, subDays, isWithinInterval } from "date-fns";
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

export const Dashboard = () => {
  const initialFilter = localStorage.getItem("selectedFilter") || "Last 7 Days";
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [exportingPDF, setExportingPDF] = useState(false);

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

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["parentusers"],
    queryFn: fetchUsers,
    staleTime: Infinity,
  });

  const {
    data: logsData,
    isLoading: isLogsLoading,
    isError: isLogsError,
  } = useQuery({
    queryKey: ["parentlogs"],
    queryFn: fetchUserLogs,
    staleTime: Infinity,
  });

  const { data } = useQuery({
    queryKey: ["parentwebsite"],
    queryFn: fetchBlockedWebsite,
    staleTime: Infinity,
  });

  const blockedData: Website[] = data ?? [];

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

  const filteredUsersData = usersData
    ? usersData.filter((user) => applyDateFilter(user.createdAt))
    : [];
  const filteredLogsData = logsData
    ? logsData.filter((log) => applyDateFilter(log.date))
    : [];
  const filteredBlockedData = blockedData.filter((website) =>
    applyDateFilter(website.createdAt),
  );

  if (isUsersError || isLogsError) {
    return <p className="text-red-600">Error fetching data</p>;
  }

  const userCount = filteredUsersData.length;
  const logCount = filteredLogsData.length;
  const recentBlockedWebsites = filteredBlockedData.slice(0, 9);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd-MMM-yyyy");
  };

  const exportAsPDF = async () => {
    setExportingPDF(true);
    const input = document.getElementById("dashboard-content");
    if (input) {
      html2canvas(input, {
        backgroundColor: "#161b2d",
        scale: 2,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "tabloid");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Parent Dashboard Report.pdf");
        setExportingPDF(false);
      });
    }
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
        <button
          className="ml-4 p-2 bg-blue-600 hover:bg-blue-700 rounded-sm text-[16px] pr-3 pl-3 cursor-pointer"
          onClick={exportAsPDF}
          disabled={exportingPDF}
        >
          {exportingPDF ? "Processing..." : "Export as PDF"}
        </button>
      </div>

      <div
        id="dashboard-content"
        className="grid grid-cols-1 lg:grid-cols-3 gap-2"
      >
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
                filteredBlockedData.length
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
          <TopWebsitesChart selectedFilter={selectedFilter} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 col-span-3">
          <div
            className="p-6 rounded-sm"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-start mb-8">
              <div className="flex items-center mr-16">
                <h2 className="text-[16px] font-bold mr-4">
                  Location Tracking (Pie Chart)
                </h2>
              </div>
            </div>
            <div className="h-60"></div>
          </div>

          <div
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
          </div>
        </div>
      </div>
    </div>
  );
};
