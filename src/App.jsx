import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginOrSignUp from "./Components/LoginOrSignUpPage/loginorsignup.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/protectedroute.jsx";

// Employee pages
import ManagerHomePage from "./Components/ManagerHomePage/managerhomepage.jsx";
import EmployeeDashboard from "./Components/EmployeeDashboard/employeedashboard.jsx";
import NewRequest from "./Components/NewRequest/newrequest.jsx";
import MyRequests from "./Components/MyRequests/myrequests.jsx";
import TrackRequest from "./Components/TrackRequest/trackrequest.jsx";
import DirectorDashboard from "./Components/DirectorDashboard/directordashboard.jsx";
import DirectorHomePage from "./Components/DirectorHomePage/directorhomepage.jsx";
import DeptHeadHomePage from "./Components/DeptHeadHomePage/deptheadhomepage.jsx";

// Manager pages
import ApproverDashboard from "./Components/ApproverDashboard/approverdashboard.jsx";

import DeptHeadDashboard from "./Components/DeptHeadDashboard/deptheaddashboard.jsx";
// Admin pages
import AdminDashboard from "./Components/AdminDashboard/admindashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginOrSignUp />} />

        {/* Employee Routes */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/new-request"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <NewRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/my-requests"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <MyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/track/:id"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <TrackRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ApproverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/depthead/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Dept Head"]}>
              <DeptHeadDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/director/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Director"]}>
              <DirectorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/director"
          element={
            <ProtectedRoute allowedRoles={["Director"]}>
              <DirectorHomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/depthead"
          element={
            <ProtectedRoute allowedRoles={["Dept Head"]}>
              <DeptHeadHomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ManagerHomePage />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

