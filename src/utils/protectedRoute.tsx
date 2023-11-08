import React from "react";
import { useUserStore } from "../hooks/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated === null || isAuthenticated === undefined) {
    return <></>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default PrivateRoutes;
