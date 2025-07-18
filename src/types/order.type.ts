import type { IUser } from '@/redux/features/auth/authSlice';
import type IProduct from './product.type';

export type TOrderStatus =
  | 'pending'
  | 'processing'
  | 'packaged'
  | 'delivering'
  | 'user-cancelled'
  | 'admin-cancelled'
  | 'completed';

export default interface IOrder {
  _id: string;
  user: string | IUser;
  admin?: string | IUser;
  shippingInformation: string;
  products: { id: IProduct[]; quantity: number };
  status: TOrderStatus;
  cancelReason?: string;
  totalPrice: number;
}
