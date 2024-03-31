import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Auth/AuthProvider";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Home from "./Home/Home";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Payment from "./Auth/Payment";
import ResetPassword from "./Auth/Utils/ResetPassword";
import Dashboard from "./Customer/Dashboard/Dashboard";
import Profile from "./Customer/Profile";
import Tracker from "./Customer/Tracker/Tracker";
import WorkoutSchedule from "./Customer/Workout/WorkoutSchedule";
import NutritionPlan from "./Customer/Nutrition/NutritionPlan";
import GymAccess from "./Customer/Gym/GymAccess";
import Coaches from "./Customer/Coaches/Coaches";
import Clients from "./Coach/Clients";
import CoachProfile from "./Coach/CoachProfile";
import ClientDashboard from "./Coach/ClientDashboard/ClientDashboard";
import ClientTracker from "./Coach/ClientTracker/ClientTracker";
import ClientWorkoutSchedule from "./Coach/ClientWorkoutSchedule/ClientWorkoutSchedule";
import ClientNutritionPlan from "./Coach/ClientNutritionPlan/ClientNutritionPlan";
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
            <Route path="/workout" element={<WorkoutSchedule />} />
            <Route path="/nutrition" element={<NutritionPlan />} />
            <Route path="/gym-access" element={<GymAccess />} />
          </Route>
          {/* Coach Routes */}
          <Route element={<ProtectedRoute role="COACH" />}>
            <Route path="/clients" element={<Clients />} />
            <Route path="/coach-profile" element={<CoachProfile />} />
            <Route path="/client/:id" element={<ClientDashboard />} />
            <Route path="/client/:id/tracker" element={<ClientTracker />} />
            <Route
              path="/client/:id/workout"
              element={<ClientWorkoutSchedule />}
            />
            <Route
              path="/client/:id/nutrition"
              element={<ClientNutritionPlan />}
            />
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
