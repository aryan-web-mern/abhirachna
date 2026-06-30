import React from "react";
import { useAuth } from "../AuthProvider/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authUser, loading } = useAuth();

  if (loading && !authUser) {
    return;
  }

  if (!authUser && !loading) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
