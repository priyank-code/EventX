import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EventDetails from "./pages/EventDetails";
import QRScanner from "./pages/QRScanner";
import Register from "./pages/Register";
import Login from "./pages/Login";

import UPanel from "./pages/user/UPanel";
import ProtectedRoute from "./Protected/ProtectedRoute";

function AppWrapper() {
  const location = useLocation();

  return (
    <>
      {/* Navbar hide for /panel route */}
      {!location.pathname.startsWith("/panel") && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events" element={<QRScanner />} />

        {/* Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Panel */}
        <Route
          path="/panel"
          element={
            <ProtectedRoute>
              <UPanel />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer hide for /panel route */}
      {!location.pathname.startsWith("/panel") && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AppWrapper />
    </Router>
  );
}
