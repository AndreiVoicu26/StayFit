import { React } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const ProtectedRoute = (props) => {
  const { authenticated, role, status, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (authenticated && role === props.role) {
    if (role === "CUSTOMER") {
      if (status !== "INACTIVE") {
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
