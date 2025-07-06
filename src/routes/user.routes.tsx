import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderPlaced from '@/pages/Checkout/OrderPlaced';
import OrderSummary from '@/pages/Checkout/OrderSummary';
import MyOrders from '@/pages/Dashboards/UserDashboard/MyOrders';
import Purchased from '@/pages/Dashboards/UserDashboard/Purchased';
import Pay from '@/pages/Pay';
import Purchase from '@/pages/Purchase';
import Wishlist from '@/pages/Wishlist';
import type { IUserPath } from '@/types';
import { Inventory, ShoppingBasket } from '@mui/icons-material';

export const userDashboardPaths: IUserPath[] = [
  {
    path: 'orders',
    name: 'My Orders',
    element: <MyOrders />,
    icon: <Inventory />,
  },
  {
    path: 'purchased',
    name: 'Purchased',
    element: <Purchased />,
    icon: <ShoppingBasket />,
  },
];

export const userPaths: IUserPath[] = [
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'wishlist',
    element: <Wishlist />,
  },
  {
    path: 'purchase',
    element: <Purchase />,
  },
  {
    path: 'pay',
    element: <Pay />,
  },
  {
    path: 'checkout',
    element: <Checkout />,
  },
  {
    path: 'order-summary/:shipping-id',
    element: <OrderSummary />,
  },

  {
    path: 'orderPlaced',
    // name: "Order Placed",
    element: <OrderPlaced />,
  },
];
