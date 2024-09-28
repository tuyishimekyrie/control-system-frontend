import React from "react";
import { AiTwotoneDashboard } from "react-icons/ai";
import { MdMonitorHeart } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiListSettingsLine } from "react-icons/ri";
import { PiUsersThree } from "react-icons/pi";
import { BsFilterCircle } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

export type SidebarLink = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
};

export const ParentSidebarLinks: SidebarLink[] = [
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
    id: 6,
    name: "Filtering",
    icon: BsFilterCircle,
    link: "/filtering",
  },
  {
    id: 7,
    name: "Notifications",
    icon: IoIosNotificationsOutline,
    link: "/notifications",
  },
  {
    id: 8,
    name: "Location",
    icon: CiLocationOn,
    link: "/location",
  },
  {
    id: 5,
    name: "Settings",
    icon: RiListSettingsLine,
    link: "/settings",
  },
];