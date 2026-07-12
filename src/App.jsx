import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("beezy_token");
  return token ? children : <Navigate to="/" replace />;
};

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem("beezy_token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

// Clear any stale auth on first load
if (typeof window !== "undefined") {
  const appVersion = "v3";
  if (localStorage.getItem("beezy_app_version") !== appVersion) {
    localStorage.removeItem("beezy_authenticated");
    localStorage.removeItem("beezy_token");
    localStorage.setItem("beezy_app_version", appVersion);
  }
}

export default function App() {
  return (
    <Router>
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
      <Suspense fallback={<div style={{minHeight:"100vh",background:"#0B3B24"}} />}>
        <Routes>
          <Route path="/" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
          <Route path="/signup" element={<RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated>} />
          <Route path="/forgot-password" element={<RedirectIfAuthenticated><ForgotPassword /></RedirectIfAuthenticated>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
