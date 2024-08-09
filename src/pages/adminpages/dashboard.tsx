import React, { useState, useRef, useEffect } from "react";
import { FcNext } from "react-icons/fc";
import { RiFilter3Fill } from "react-icons/ri";

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
  }, [ref, handler]);
};

const Dashboard = () => {
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
            <div className="flex items-center justify-start mb-4">
              <h2 className="text-[16px] font-bold mr-4">Total Users</h2>
            </div>
            <div className="h-20"></div>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-start mb-4">
              <h2 className="text-[16px] font-bold mr-4">Total Blocked</h2>
            </div>
            <div className="h-20"></div>
          </div>
          <div
            className="p-6 rounded-sm"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <div className="flex items-center justify-start mb-4">
              <h2 className="text-[16px] font-bold mr-4">Total Deleted</h2>
            </div>
            <div className="h-20"></div>
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
            {[
              "twitter.com",
              "google.com",
              "goojara.com",
              "facebook.com",
              "alibaba.com",
              "shoes.com",
            ].map((domain, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <p>{domain}</p>
                  <span className="text-red-600 text-[14px]">Blocked</span>
                </div>
                <span className="text-green-600 text-[14px]">18:16:01</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="p-6 rounded-sm col-span-2"
          style={{ backgroundColor: "#1F2A40" }}
        >
          <div className="flex items-center justify-start mb-8">
            <div className="flex items-center mr-16">
              <h2 className="text-[16px] font-bold mr-4">
                Website Tracking Activity
              </h2>
            </div>
          </div>
          <div className="h-40"></div>
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

export default Dashboard;