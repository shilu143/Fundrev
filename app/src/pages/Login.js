import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// import "../css/Login/Login.module.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert_text, setAlertText] = useState(
    "Some error occurred. Please try again."
  );
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });
      console.log(res);
      const token = res.data.token;
      localStorage.setItem("authToken", token);
      onLogin();
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setShowAlert(true);
      if (err.response) {
        setAlertText(err.response.data.message);
      }
    }
  };
  return (
    <div className="container h-100 mt-5">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome Back</h5>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="username"
                    className="form-control"
                    id="username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary custom-btn"
                  style={{
                    backgroundColor: "#ff5b13",
                    borderColor: "#ff5b13",
                    width: "100%",
                  }}
                >
                  Login
                </button>
              </form>
              {showAlert && (
                <div
                  class="alert alert-danger d-flex align-items-center mt-3"
                  role="alert"
                >
                  <div>{alert_text}</div>
                </div>
              )}

              <div className="mt-3">
                <span>Don't have an account? </span>
                <p>
                  <Link
                    class="link-offset-2 link-underline link-underline-opacity-0"
                    to="/register"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
