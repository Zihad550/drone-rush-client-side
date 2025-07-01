import type { ReactNode } from "react";
import { logout, selectToken } from "@/redux/features/auth/authSlice";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";

interface IProps {
  children: ReactNode;
  role: string | undefined;
}
const ProtectedRoute = ({ children, role }: IProps) => {
  const token = useAppSelector(selectToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const dispatch = useAppDispatch();
  if ((role !== undefined && user?.role !== role) || !token) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
