import Spinner from "components/Shared/Spinner";
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
  const user = useSelector((state: AppState) => state.auth);
  const location = useLocation();

  if (!user) return <Spinner />;

  if (Object.keys(user).length) return children;

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
