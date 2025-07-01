// general routes
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import { createBrowserRouter } from "react-router";
import App from "@/App";
import ProtectedRoute from "@/layout/ProtectedRoute";
import { routeGenerator } from "@/utils/routesGenerator";
import { userDashboardPaths, userPaths } from "./user.routes";
import { adminPaths } from "./admin.routes";
import { publicPaths } from "./public.routes";
import Dashboard from "@/layout/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: routeGenerator(publicPaths),
  },
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute role="user">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(userDashboardPaths),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    Component: App,
    children: routeGenerator(userPaths),
  },

  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },

  {
    path: "*",
    element: <div>Page Not Found</div>,
  },
]);

export default router;
