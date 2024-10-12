import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import Dashboard from "../pages/adminpages/dashboard";
import WebFilterRules from "../pages/adminpages/WebFilterRules";
import WebActivity from "../pages/adminpages/WebActivity";
import Settings from "../pages/adminpages/settings";
import Users from "../pages/adminpages/manageUserRoles";
import Register from "../pages/Register";
import SchoolRegister from "../pages/authpages/schoolRegister";
import ParentsRegister from "../pages/authpages/parentsRegister";
import Login from "../pages/Login";
import Home from "../pages/Home";
import FilteringKeyword from "../pages/adminpages/FilteringKeyword";
import AddBlockedURL from "../pages/adminpages/AddBlockedUrls";
import AddCategory from "../pages/adminpages/AddCategory";
import AddKeyword from "../pages/adminpages/AddKeyword";
import { ManagerLayout } from "../layouts/ManagersLayout";
import * as ManagerPages from "../pages/managerpages/index";
import * as SchoolPages from "../pages/managerpages/index";
import * as ParentPages from "../pages/managerpages/index";
import Notification from "../pages/managerpages/Notification";
import ParentNotification from "../pages/parentpages/Notification";
import SchoolNotification from "../pages/schoolpages/Notification";
import { Location } from "../pages/managerpages/Location";
import { ParentLocation } from "../pages/parentpages/Location";
import { SchoolLocation } from "../pages/schoolpages/Location";
import ManageOrganizations from "../pages/adminpages/manageOrganizations";
import ManageSchools from "../pages/adminpages/manageSchools";
import ManageParents from "../pages/adminpages/manageParents";
import { Location as AllLocation } from "../pages/adminpages/Location";
import ForgotPassword from "../pages/forgotPassword";
import { ParentLayout } from "../layouts/ParentLayout";
import { SchoolLayout } from "../layouts/SchoolLayout";
import GeoFencing from "../pages/managerpages/GeoFencing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/register/organization",
    element: <Register />,
  },
  {
    path: "/auth/register/school",
    element: <SchoolRegister />,
  },
  {
    path: "/auth/register/parent",
    element: <ParentsRegister />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "rules", element: <WebFilterRules /> },
      { path: "logs", element: <WebActivity /> },
      { path: "settings", element: <Settings /> },
      { path: "users", element: <Users /> },
      { path: "filtering", element: <FilteringKeyword /> },
      { path: "add-blocked-url", element: <AddBlockedURL /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "add-keyword", element: <AddKeyword /> },
      { path: "organizations", element: <ManageOrganizations /> },
      { path: "schools", element: <ManageSchools /> },
      { path: "parents", element: <ManageParents /> },
      { path: "location", element: <AllLocation /> },
    ],
  },
  {
    path: "manager",
    element: <ManagerLayout />,
    children: [
      { index: true, element: <ManagerPages.Dashboard /> },
      { path: "rules", element: <ManagerPages.WebFilterRules /> },
      { path: "logs", element: <ManagerPages.WebActivity /> },
      { path: "settings", element: <ManagerPages.Settings /> },
      { path: "users", element: <ManagerPages.ManageUserRoles /> },
      { path: "filtering", element: <ManagerPages.FilteringKeyword /> },
      { path: "add-blocked-url", element: <ManagerPages.AddBlockedURL /> },
      { path: "add-category", element: <ManagerPages.AddCategory /> },
      { path: "add-keyword", element: <ManagerPages.AddKeyword /> },
      { path: "notifications", element: <Notification /> },
      { path: "location", element: <Location /> },
      { path: "geofencing", element: <GeoFencing /> },
    ],
  },
  {
    path: "parent",
    element: <ParentLayout />,
    children: [
      { index: true, element: <ParentPages.Dashboard /> },
      { path: "rules", element: <ParentPages.WebFilterRules /> },
      { path: "logs", element: <ParentPages.WebActivity /> },
      { path: "settings", element: <ParentPages.Settings /> },
      { path: "users", element: <ParentPages.ManageUserRoles /> },
      { path: "filtering", element: <ParentPages.FilteringKeyword /> },
      { path: "add-blocked-url", element: <ParentPages.AddBlockedURL /> },
      { path: "add-category", element: <ParentPages.AddCategory /> },
      { path: "add-keyword", element: <ParentPages.AddKeyword /> },
      { path: "notifications", element: <ParentNotification /> },
      { path: "location", element: <ParentLocation /> },
    ],
  },
  {
    path: "school",
    element: <SchoolLayout />,
    children: [
      { index: true, element: <SchoolPages.Dashboard /> },
      { path: "rules", element: <SchoolPages.WebFilterRules /> },
      { path: "logs", element: <SchoolPages.WebActivity /> },
      { path: "settings", element: <SchoolPages.Settings /> },
      { path: "users", element: <SchoolPages.ManageUserRoles /> },
      { path: "filtering", element: <SchoolPages.FilteringKeyword /> },
      { path: "add-blocked-url", element: <SchoolPages.AddBlockedURL /> },
      { path: "add-category", element: <SchoolPages.AddCategory /> },
      { path: "add-keyword", element: <SchoolPages.AddKeyword /> },
      { path: "notifications", element: <SchoolNotification /> },
      { path: "location", element: <SchoolLocation /> },
    ],
  },
]);
