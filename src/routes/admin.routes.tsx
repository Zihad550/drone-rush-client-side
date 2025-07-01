import AddDrone from "@/pages/Dashboards/AdminDashboard/AddDrone";
import MakeAdmin from "@/pages/Dashboards/AdminDashboard/MakeAdmin";
import ManageDrones from "@/pages/Dashboards/AdminDashboard/ManageDrones";
import ManageOrders from "@/pages/Dashboards/AdminDashboard/ManageOrders";
import type { IUserPath } from "@/types";

export const adminPaths: IUserPath[] = [
  {
    path: "/dashboard/addDrone",
    name: "Add Drone",
    element: <AddDrone />,
  },
  {
    path: "/dashboard/makeAdmin",
    name: "Make Admin",
    element: <MakeAdmin />,
  },
  {
    path: "/dashboard/manageDrones",
    name: "Manage Drones",
    element: <ManageDrones />,
  },
  {
    path: "/dashboard/manageOrders",
    name: "Manage Orders",
    element: <ManageOrders />,
  },
];
