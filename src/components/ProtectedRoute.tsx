import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import { Spinner } from "@nextui-org/react";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth(); // Assuming 'loading' state is available in your context

  // If loading, don't render anything (or a loader if desired)
  if (loading) {
    return <Spinner/>; // You can replace this with a loading spinner or something similar
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
