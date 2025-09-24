import React from "react";  
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const jwtToken = Cookies.get("jwtToken");

  console.log("ProtectedRoute → user:", user);
  console.log("ProtectedRoute → jwtToken:", jwtToken);

  if (!jwtToken || !user) {
    return <Navigate to="/" replace />;
  }

  const userRole = Array.isArray(user.role) ? user.role[0] : user.role;
  console.log("ProtectedRoute → userRole:", userRole);

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;