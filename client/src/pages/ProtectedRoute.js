import React from "react";
import { useGlobalContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  // children will be shared layout
  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
