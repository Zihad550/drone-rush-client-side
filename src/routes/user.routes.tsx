import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderPlaced from "@/pages/Checkout/OrderPlaced";
import MyOrders from "@/pages/Dashboards/UserDashboard/MyOrders";
import Purchased from "@/pages/Dashboards/UserDashboard/Purchased";
import Pay from "@/pages/Pay";
import Purchase from "@/pages/Purchase";
import Wishlist from "@/pages/Wishlist";
import type { IUserPath } from "@/types";
import { Inventory, ShoppingBasket } from "@mui/icons-material";

export const userDashboardPaths: IUserPath[] = [
  {
    path: "myOrders",
    name: "My Orders",
    element: <MyOrders />,
    icon: <Inventory />,
  },
  {
    path: "purchased",
    name: "Purchased",
    element: <Purchased />,
    icon: <ShoppingBasket />,
  },
];

export const userPaths: IUserPath[] = [
  {
    path: "cart",
    name: "Cart",
    element: <Cart />,
  },
  {
    path: "wishlist",
    name: "Wishlist",
    element: <Wishlist />,
  },
  {
    path: "purchase",
    name: "Purchase",
    element: <Purchase />,
  },
  {
    path: "pay",
    name: "Pay",
    element: <Pay />,
  },
  {
    path: "checkout/:totalPrice",
    name: "Checkout",
    element: <Checkout />,
  },
  {
    path: "orderPlaced",
    name: "Order Placed",
    element: <OrderPlaced />,
  },
];
