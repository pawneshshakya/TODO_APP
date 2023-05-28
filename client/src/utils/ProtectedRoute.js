import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const location = useLocation();
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.reload("/login");
    }
  }, [isAuthenticated, location]);

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
