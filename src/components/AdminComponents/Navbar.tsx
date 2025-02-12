import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoHelpBuoyOutline, IoNotificationsOutline } from "react-icons/io5";
import { fetchManagerNotifications } from "../../services/postData";
import Notifications from "./Notifications";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  title: string;
  onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const { data } = useQuery({
    queryKey: ["adminNotifications"],
    queryFn: fetchManagerNotifications,
    staleTime: Infinity,
  });
  return (
    <div
      className="flex justify-between items-center p-6 pt-7"
      style={{ backgroundColor: "#141b2d" }}
    >
      <h4 className="text-3xl font-semibold text-green-600">{title}</h4>
      <div className="flex items-center space-x-10">
        <NavLink to="/admin/help" className="flex items-center space-x-2">
          <IoHelpBuoyOutline className="text-[20px] text-gray-400" />
          <span className="text-[14px] text-gray-400">Need Help?</span>
        </NavLink>
        <IoNotificationsOutline
          className="text-[20px] text-gray-400 cursor-pointer"
          onClick={toggleNotifications}
        />
        <span className="text-white bg-green-600 w-5 h-5 flex justify-center items-center rounded-[50%] absolute right-4 top-5">
          {data?.notificationsNumber}
        </span>
        {showNotifications && data && <Notifications data={data} />}
      </div>
    </div>
  );
};

export default Navbar;
