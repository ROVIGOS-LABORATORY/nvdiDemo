import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Navigate to="/predictions" replace />;
  }

  return children;
};

export default GuestRoute;
