// general routes
import Home from "@/pages/Home";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import Details from "@/pages/Details";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";
import Drones from "@/pages/Drones";
import { createBrowserRouter } from "react-router";
import App from "@/App";
import UserDashboard from "@/pages/Dashboards/UserDashboard";
import AdminDashboard from "@/pages/Dashboards/AdminDashboard";
import ProtectedRoute from "@/layout/ProtectedRoute";
import { routeGenerator } from "@/utils/routesGenerator";
import { userDashboardPaths, userPaths } from "./user.routes";
import { adminPaths } from "./admin.routes";
import { publicPaths } from "./public.routes";

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
        <UserDashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(userDashboardPaths),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    Component: UserDashboard,
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
