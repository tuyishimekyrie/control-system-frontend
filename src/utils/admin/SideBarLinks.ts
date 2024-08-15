import React from "react";
import { AiTwotoneDashboard } from "react-icons/ai";
import { MdMonitorHeart } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiListSettingsLine } from "react-icons/ri";
import { PiUsersThree } from "react-icons/pi";
export type SidebarLink = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
};

export const AdminSidebarLinks: SidebarLink[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: AiTwotoneDashboard,
    link: "/",
  },
  {
    id: 2,
    name: "Web Filters",
    icon: MdMonitorHeart,
    link: "/rules",
  },
  {
    id: 3,
    name: "Web Activity",
    icon: BsGraphUpArrow,
    link: "/logs",
  },
  {
    id: 4,
    name: "Manage Users",
    icon: PiUsersThree,
    link: "/users",
  },
  {
    id: 5,
    name: "Settings",
    icon: RiListSettingsLine,
    link: "/settings",
  },
  {
    id: 6,
    name: "Filtering",
    icon: RiListSettingsLine,
    link: "/filtering",
  },
];
