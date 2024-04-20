import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "../css/Login/Login.module.css";
import api from "../services/api";

function Register({onRegister}) {
  const [isStartup, setIsStartup] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alert_text, setAlertText] = useState(
    "Some error occurred. Please try again."
  );
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const company_name = document.getElementById("company_name").value;
    const business_description = document.getElementById(
      "business_description"
    ).value;
    const revenue = document.getElementById("revenue").value;
    try {
      const res = await api.post("/auth/register", {
        username,
        password,
        user_type: isStartup ? "startup" : "investor",
        company_name,
        business_description,
        revenue,
      });
      console.log(res);
      const token = res.data.token;
      localStorage.setItem("authToken", token);
        onRegister();
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
              <h5 className="card-title">Create an Account</h5>
              <div className="d-flex justify-content-center ">
                <button
                  className={isStartup ? css.switcherActive : css.switcher}
                  onClick={() => setIsStartup(true)}
                >
                  Startup
                </button>
                <button
                  className={!isStartup ? css.switcherActive : css.switcher}
                  onClick={() => setIsStartup(false)}
                >
                  Investor
                </button>
              </div>
              {isStartup ? (
                <form onSubmit={handleRegister}>
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
                    <label htmlFor="companyName" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="company_name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="business_description"
                      className="form-label"
                    >
                      Business Description
                    </label>
                    <textarea
                      className="form-control"
                      id="business_description"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="revenue" className="form-label">
                      Revenue
                    </label>
                    {/* no negative number allowed */}
                    <input
                      type="number"
                      className="form-control"
                      id="revenue"
                      min="0"
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
                      minLength="6"
                      maxLength="20"
                    />
                    <p className={css.smallFont}>
                      Password must be at least 6 characters long
                    </p>
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
                    Create Account
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Username
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
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
                      minLength="6"
                      maxLength="20"
                    />
                    <p className={css.smallFont}>
                      Password must be at least 6 characters long
                    </p>
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
                    Create Account
                  </button>
                </form>
              )}

              {showAlert && (
                <div
                  class="alert alert-danger d-flex align-items-center mt-3"
                  role="alert"
                >
                  <div>{alert_text}</div>
                </div>
              )}

              {/* new user register link */}
              <div className="mt-3">
                <span>Already have an account? </span>
                <p>
                  <Link
                    class="link-offset-2 link-underline link-underline-opacity-0"
                    to="/"
                  >
                    Login
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

export default Register;
