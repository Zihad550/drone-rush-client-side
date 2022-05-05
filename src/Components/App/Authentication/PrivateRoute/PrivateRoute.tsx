import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import Spinner from "../../../Shared/Spinner/Spinner";

const PrivateRoute = ({ children, ...rest }: {children: React.ReactElement}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) return <Spinner />;
  
  if(Object.keys(user).length) return children;
  
  return  <Navigate to='/login' state={{from: location}}/>
  
};

export default PrivateRoute;
