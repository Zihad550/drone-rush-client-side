import Spinner from "components/Shared/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { AppState } from "redux/store";

const AdminRoute = ({
  children,
  ...rest
}: {
  children: React.ReactElement;
}) => {
  const location = useLocation();
  const user = useSelector((state: AppState) => state.auth.data);

  if (!user) return <Spinner />;
  if (user.role === "admin") return children;
  return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoute;
