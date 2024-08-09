import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarLink, AdminSidebarLinks } from "../../utils/admin/SideBarLinks";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import Profile from "../../assets/tim.jpg";

interface SidebarProps {
  menuActive: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ menuActive }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`transition-all duration-300 transform fixed lg:relative z-10 h-full ${
        menuActive ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${isCollapsed ? "w-20" : "w-64"}`}
      style={{ backgroundColor: "#1F2A40" }}
    >
      <div
        className="flex flex-col h-full w-full border-r shadow-lg"
        style={{ backgroundColor: "#1F2A40" }}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } p-4 mb-4`}
        >
          {!isCollapsed && (
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={Profile}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
          <RxHamburgerMenu
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ fontSize: "25px", color: "green", cursor: "pointer" }}
          />
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <ul
            className={`flex flex-col ${
              isCollapsed ? "items-center" : ""
            } text-gray-400 font-semibold space-y-1 text-[14px]`}
          >
            {AdminSidebarLinks.map((item: SidebarLink) => (
              <li
                key={item.id}
                className={`hover:text-white ${
                  isCollapsed ? "flex justify-center" : ""
                }`}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                <NavLink
                  end
                  className={({ isActive }) =>
                    `flex items-center ${
                      isCollapsed ? "justify-center" : "justify-between"
                    } p-4 gap-x-3 w-full ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "hover:bg-green-600"
                    }`
                  }
                  to={`/admin${item.link}`}
                  data-testid={`navlink-${item.name.toLowerCase()}`}
                >
                  <div className="flex items-center gap-x-3">
                    <item.icon
                      className="text-[20px]"
                      data-testid={`${item.name.toLowerCase()}-icon`}
                    />
                    {!isCollapsed && (
                      <span className="tracking-wide">{item.name}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <MdKeyboardArrowRight
                      className="ml-auto text-[20px]"
                      data-testid={`${item.name.toLowerCase()}-arrow`}
                    />
                  )}
                </NavLink>
              </li>
            ))}
            <li className="hover:text-white">
              <button
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "justify-between"
                } p-4 gap-x-3 w-full text-left hover:bg-green-600`}
                data-testid="logout-button"
              >
                <div className="flex items-center gap-x-2">
                  <TbLogout className="text-[20px]" />
                  {!isCollapsed && (
                    <span className="tracking-wide">Logout</span>
                  )}
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
