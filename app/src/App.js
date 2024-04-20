import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import css from "./css/App/App.module.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to manage whether a user is logged in

  const handleLogin = () => {
    // Simulate successful login
    setIsLoggedIn(true);
    console.log("Logged in");
  };

  const handleLogout = () => {
    // Simulate logout
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    console.log("Logged out");
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className={css.App}>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
