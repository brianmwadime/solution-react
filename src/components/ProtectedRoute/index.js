import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ element: Element }) => {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  if (
    !token &&
    [
      "/dashboard",
      "/music",
      "/musicalbum",
      "/withdraw",
      "/earnings",
      "/payments",
    ].includes(pathname)
  ) {
    return <Navigate to="/login" />;
  }
  return <Element />;
};
