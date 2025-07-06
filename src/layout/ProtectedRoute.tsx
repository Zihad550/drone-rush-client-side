import {
  logout,
  selectToken,
  type IUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface IProps {
  children: ReactNode;
  role: string | undefined;
}
const ProtectedRoute = ({ children, role }: IProps) => {
  const token = useAppSelector(selectToken);
  let user;
  if (token) {
    user = verifyToken(token) as IUser;
  }

  const dispatch = useAppDispatch();
  if ((role !== undefined && user?.role !== role) || !token) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
