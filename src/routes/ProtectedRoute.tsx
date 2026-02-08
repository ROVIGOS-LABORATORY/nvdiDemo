import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
