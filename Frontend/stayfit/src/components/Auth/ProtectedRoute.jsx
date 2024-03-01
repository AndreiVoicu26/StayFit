import { React, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const ProtectedRoute = (props) => {
  const { authenticated, role, status, loading } = useAuth();

  if (loading) {
    return null;
  }

  return authenticated &&
    role === props.role &&
    !(role === "CUSTOMER" && status === "INACTIVE") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
