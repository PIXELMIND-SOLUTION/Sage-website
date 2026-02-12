import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem("isAdminAuth") === "true";

  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
