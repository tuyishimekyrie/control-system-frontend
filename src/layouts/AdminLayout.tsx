import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/AdminComponents/Navbar";
import Sidebar from "../components/AdminComponents/Sidebar";
export const AdminLayout: React.FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const { pathname } = useLocation();

  const handleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const getTitle = () => {
    const path = pathname.split("/").pop() || "";
    switch (path) {
      case "rules":
        return "CONTENT FILTERING";
      case "logs":
        return "USER ACTIVITY";
      case "users":
        return "MANAGE USERS";
      case "filtering":
        return "WEB FIILTERS";
      case "organizations":
        return "ORGANIZATIONS";
      case "parents":
        return "PARENTS";
      case "schools":
        return "SCHOOLS";
      case "settings":
        return "SETTINGS";
      case "help":
        return "HELP";
      default:
        return "DASHBOARD";
    }
  };

  return (
    <main className="h-screen flex">
      <Sidebar menuActive={menuActive} />
      <section className="flex-1 flex flex-col">
        <Navbar title={getTitle()} onClick={handleMenu} />
        <main className="flex-1 overflow-y-auto pb-3">
          <Outlet />
        </main>
      </section>
    </main>
  );
};
