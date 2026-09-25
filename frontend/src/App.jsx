import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage";
import UserRegistrationPage from "./Pages/UserRegistrationPage";
import UserProfile from "./Pages/UserProfile";
import Services from "./Pages/Services";
import ServiceDetails from "./Pages/ServiceDetails";
import Booking from "./Pages/Booking";
import Reviews from "./Pages/Review";
import Payment from "./Pages/Payment";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import ProviderDashboard from "./Pages/ProviderDashboard";
import MyOrders from "./Pages/MyOrders";
import Pay from "./Pay";
import Project from "./Project";
import Reports from "./Report";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        
        {/* Profile & Services protected: Accessible only after Login */}
        <Route 
          path="/user-profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/services" 
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile/:id" 
          element={
            <ProtectedRoute>
              <ServiceDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/book/:id" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment-success" 
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-orders" 
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } 
        />

        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/payments" element={<Pay />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/reports" element={<Reports />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
