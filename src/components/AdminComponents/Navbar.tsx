import React from "react";
import { IoHelpBuoyOutline, IoNotificationsOutline } from "react-icons/io5";

interface NavbarProps {
  title: string;
  onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <div
      className="flex justify-between items-center p-6 pt-7"
      style={{ backgroundColor: "#141b2d" }}
    >
      <h4 className="text-3xl font-semibold text-green-600">{title}</h4>
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-2">
          <IoHelpBuoyOutline className="text-[20px] text-gray-400" />
          <p className="text-[14px] text-gray-400">Need Help?</p>
        </div>
        <IoNotificationsOutline className="text-[20px] text-gray-400" />
      </div>
    </div>
  );
};

export default Navbar;
