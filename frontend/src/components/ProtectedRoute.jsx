import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = useSelector((state) => state.user?.data);

  if (!userData) {
    return <Navigate to={`/login`} replace />
  }

  return children;
};

export default ProtectedRoute;
