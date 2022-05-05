import React, { ReactChild, ReactChildren } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import Spinner from "../../../Shared/Spinner/Spinner";

interface AdminRouteProps {
  children: ReactChild | ReactChildren
}

const AdminRoute = ({ children, ...rest }:  AdminRouteProps) => {
  const { user, admin , adminLoading} = useAuth();
  const location = useLocation();
  
  if (adminLoading) return <Spinner />;
  if(Object.keys(user).length) return children;
  return <Navigate to="/login" state={{from: location}} />
};

export default AdminRoute;
