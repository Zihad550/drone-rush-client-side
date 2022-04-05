import React from "react";
import { Redirect, Route } from "react-router";
import Spinner from "../../../Compoinents/Spinner";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin , adminLoading} = useAuth();
  if (adminLoading) {
    return <Spinner />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
