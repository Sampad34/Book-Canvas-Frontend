import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  // FIXED: Direct check without JSON.parse
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
