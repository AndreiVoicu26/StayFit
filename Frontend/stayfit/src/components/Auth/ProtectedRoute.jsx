import { React, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const ProtectedRoute = (props) => {
  const { authenticated, role, status, loading, checkAuth, checkStatus } =
    useAuth();

  if (loading) {
    return null;
  }

  if (authenticated && role === props.role) {
    if (role === "CUSTOMER") {
      if (status === "ACTIVE") {
        return <Outlet />;
      } else {
        return <Navigate to="/payment" />;
      }
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
