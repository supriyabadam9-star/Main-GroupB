import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo-dot">●</span>
        <span className="logo-text">Insure Assist</span>
      </div>

      <div className="navbar-right">
        <span className="member-text">Already a member?</span>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </header>
  );
}

export default Navbar;
