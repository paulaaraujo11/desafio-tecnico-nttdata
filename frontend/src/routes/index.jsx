import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from '../components/RegistrationPage';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';

export default function AppRoutes() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleRegister = () => {
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage onRegister={handleRegister} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard token={token} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}