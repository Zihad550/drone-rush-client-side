import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { AppState } from "redux/store";

const PrivateRoute = ({
  children,
  ...rest
}: {
  children: React.ReactElement;
}) => {
  const { data: user } = useSelector((state: AppState) => state.auth);
  console.log(user);
  const location = useLocation();

  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
