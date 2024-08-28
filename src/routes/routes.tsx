import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import Dashboard from "../pages/adminpages/dashboard";
import WebFilterRules from "../pages/adminpages/WebFilterRules";
import WebActivity from "../pages/adminpages/WebActivity";
import Settings from "../pages/adminpages/settings";
import Users from "../pages/adminpages/manageUserRoles";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import FilteringKeyword from "../pages/adminpages/FilteringKeyword";
import AddBlockedURL from "../pages/adminpages/AddBlockedUrls";
import AddCategory from "../pages/adminpages/AddCategory";
import AddKeyword from "../pages/adminpages/AddKeyword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
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
    ],
  },
]);
