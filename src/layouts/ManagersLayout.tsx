import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/ManagerComponents/Navbar";
import Sidebar from "../components/ManagerComponents/Sidebar";
export const ManagerLayout: React.FC = () => {
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
      case "settings":
        return "SETTINGS";
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
