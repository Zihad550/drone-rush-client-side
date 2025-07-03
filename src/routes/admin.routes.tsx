import AddDrone from "@/pages/Dashboards/AdminDashboard/AddDrone";
import MakeAdmin from "@/pages/Dashboards/AdminDashboard/MakeAdmin";
import ManageDrones from "@/pages/Dashboards/AdminDashboard/ManageDrones";
import ManageOrders from "@/pages/Dashboards/AdminDashboard/ManageOrders";
import type { IUserPath } from "@/types";
import {
  AddCircle,
  AdminPanelSettings,
  Category,
  Flight,
} from "@mui/icons-material";

export const adminPaths: IUserPath[] = [
  {
    path: "",
    name: "Add Drone",
    element: <AddDrone />,
    icon: <AddCircle />,
  },
  {
    path: "makeAdmin",
    name: "Make Admin",
    element: <MakeAdmin />,
    icon: <AdminPanelSettings />,
  },
  {
    path: "manageDrones",
    name: "Manage Drones",
    element: <ManageDrones />,
    icon: <Flight />,
  },
  {
    path: "manageOrders",
    name: "Manage Orders",
    element: <ManageOrders />,
    icon: <Category />,
  },
];
