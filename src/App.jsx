import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";

// Authentication Route Guard Helper
const HiveRouteGuard = ({ children }) => {
  const isAuth = localStorage.getItem("beezy_authenticated") === "true";
  return isAuth ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <Navigate to="/" replace />
  );
};

export default function App() {
  return (
    <Router>
      {/* Toast Notification Configured with Custom Bee Theme Elements */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1c1917",
            color: "#fbbf24",
            border: "1px solid rgba(245,158,11,0.2)",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <HiveRouteGuard>
              <Dashboard />
            </HiveRouteGuard>
          }
        />
        <Route
          path="/products"
          element={
            <HiveRouteGuard>
              <ProductList />
            </HiveRouteGuard>
          }
        />
        <Route
          path="/add"
          element={
            <HiveRouteGuard>
              <ProductForm />
            </HiveRouteGuard>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <HiveRouteGuard>
              <ProductForm />
            </HiveRouteGuard>
          }
        />
      </Routes>
    </Router>
  );
}
