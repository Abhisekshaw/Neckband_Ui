import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import ProtectedRoute from "../Component/PRoute/ProtectedRoute";
import LandingPage from "../Pages/Landingpage";
import Dashboard from "../Pages/Dashboard";
import Leftmenu from "../Leftmenu";

function Superadmin() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/left" element={<Leftmenu />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Superadmin;
