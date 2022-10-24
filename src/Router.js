import React from "react";
import { ProtectedRoute } from "Components";
import Withdraw from "Pages/Withdraw";
import Earnings from "Pages/Earnings";
import Payments from "Pages/Payments";
import MusicAlbum from "Pages/MusicAlbum";
import Music from "Pages/Music";
import Dashboard from "Pages/Dashboard";
import Login from "Pages/Login";
import Onboarding from "Pages/Onboarding";
import Registeration from "Pages/Registeration";
import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "Pages/NotFound";
import AccountPage from "Pages/Account";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/register" element={<Registeration />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={Dashboard} />} />
      <Route path="/music" element={<ProtectedRoute element={Music} />} />
      <Route
        path="/musicalbum"
        element={<ProtectedRoute element={MusicAlbum} />} />
      <Route
        path="/payments"
        element={<ProtectedRoute element={Payments} />} />

      <Route
        path="/earnings"
        element={<ProtectedRoute element={Earnings} />}>

      </Route>
      <Route
        path="/settings"
        element={<ProtectedRoute element={AccountPage} />}>

      </Route>
      <Route
        path="/earnings/withdraw"
        element={<ProtectedRoute element={Withdraw} />} />

    </Routes>
  );
};

export default Router;
