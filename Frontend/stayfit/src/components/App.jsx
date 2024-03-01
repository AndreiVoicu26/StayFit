import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Auth/AuthProvider";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Home from "./HomePage/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Payment from "./Auth/Payment";
import ResetPassword from "./Auth/ResetPassword";
import Dashboard from "./Customer/Dashboard";
import Profile from "./Customer/Profile";
import Tracker from "./Customer/Tracker";
import Coaches from "./Customer/Coaches";
import Workout from "./Customer/Workout";
import Nutrition from "./Customer/Nutrition";
import GymAccess from "./Customer/GymAccess";
import Clients from "./Coach/Clients";
import CoachProfile from "./Coach/CoachProfile";
import ClientDashboard from "./Coach/ClientDashboard";
import ClientTracker from "./Coach/ClientTracker";
import ClientWorkout from "./Coach/ClientWorkout";
import ClientNutrition from "./Coach/ClientNutrition";
import AdminDashboard from "./Admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Customer Routes */}
          <Route element={<ProtectedRoute role="CUSTOMER" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/gym-access" element={<GymAccess />} />
          </Route>
          {/* Coach Routes */}
          <Route element={<ProtectedRoute role="COACH" />}>
            <Route path="/clients" element={<Clients />} />
            <Route path="/coach-profile" element={<CoachProfile />} />
            <Route path="/client/:id" element={<ClientDashboard />} />
            <Route path="/client/:id/tracker" element={<ClientTracker />} />
            <Route path="/client/:id/workout" element={<ClientWorkout />} />
            <Route path="/client/:id/nutrition" element={<ClientNutrition />} />
          </Route>
          {/* Admin Routes */}
          <Route element={<ProtectedRoute role="SYS_ADMIN" />}>
            <Route path="/management" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
