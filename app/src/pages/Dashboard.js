import React from "react";
// import LoginForm from './components/LoginForm';

function Dashboard({ onLogout }) {
  const handleSubmit = (email, password) => {};

  return (
    <div>
        {/* flex with row  */}
      <div className="d-flex justify-content-between">
        <h1>Dashboard</h1>
        <button 
        className="btn btn-danger"
        onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
