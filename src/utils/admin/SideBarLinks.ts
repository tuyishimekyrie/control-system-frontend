import React from "react";
import { AiTwotoneDashboard } from "react-icons/ai";
// import { MdMonitorHeart } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiListSettingsLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { PiUsersThree } from "react-icons/pi";
// import { BsFilterCircle } from "react-icons/bs";
import { VscOrganization } from "react-icons/vsc";
import { CiLocationOn } from "react-icons/ci";
import { RiParentLine } from "react-icons/ri";
import { IoSchoolOutline } from "react-icons/io5";
import { MdCastForEducation } from "react-icons/md";

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
  // {
  //   id: 2,
  //   name: "Web Filters",
  //   icon: MdMonitorHeart,
  //   link: "/rules",
  // },
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
  // {
  //   id: 5,
  //   name: "Filtering",
  //   icon: BsFilterCircle,
  //   link: "/filtering",
  // },
  {
    id: 6,
    name: "Organizations",
    icon: VscOrganization,
    link: "/organizations",
  },
  {
    id: 7,
    name: "Parents",
    icon: RiParentLine,
    link: "/parents",
  },
  {
    id: 8,
    name: "Schools",
    icon: IoSchoolOutline,
    link: "/schools",
  },
  {
    id: 9,
    name: "Settings",
    icon: RiListSettingsLine,
    link: "/settings",
  },
  {
    id: 10,
    name: "Location",
    icon: CiLocationOn,
    link: "/location",
  },
  {
    id: 11,
    name: "Education",
    icon: MdCastForEducation,
    link: "/education",
  },
  {
    id: 11,
    name: "Help",
    icon: IoIosHelpCircleOutline,
    link: "/help",
  },
];
