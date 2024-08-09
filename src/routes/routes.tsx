import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import Dashboard from "../pages/adminpages/dashboard";
import WebFilterRules from "../pages/adminpages/WebFilterRules";
import WebActivity from "../pages/adminpages/WebActivity";
import Settings from "../pages/adminpages/settings";
import Users from "../pages/adminpages/manageUserRoles";
export const router = createBrowserRouter([
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "rules", element: <WebFilterRules /> },
      { path: "logs", element: <WebActivity /> },
      { path: "settings", element: <Settings /> },
      { path: "users", element: <Users /> },
    ],
  },
]);
