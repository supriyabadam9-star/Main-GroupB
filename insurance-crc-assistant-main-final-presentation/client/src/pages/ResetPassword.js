import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./resetpassword.css";
import { baseURL } from "../config";

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("reset_email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 Prevent direct access
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/auth/reset-password?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Failed to reset password");
        return;
      }

      alert("Password reset successful!");
      localStorage.removeItem("reset_email");
      navigate("/login");
    } catch (error) {
      console.error("RESET PASSWORD ERROR 👉", error);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="reset-container">
        <div className="reset-card">
          {/* LEFT IMAGE */}
          <div className="reset-left">
            <img
              src="https://res.cloudinary.com/ds66aym8t/image/upload/v1766555411/signup_hdeoj9.png"
              alt="Insurance Illustration"
              className="reset-illustration"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="reset-right">
            <h2>Reset Password</h2>
            <p>Please enter your new password below to secure your account.</p>

            <form onSubmit={handleResetPassword}>
              <label>New Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)}>👁</span>
              </div>
              <small>Must be at least 8 characters</small>

              <label>Confirm New Password</label>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  👁
                </span>
              </div>

              {/* ✅ Purple full-width button like first image */}
              <button
                type="submit"
                className="reset-btn"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div className="back" onClick={() => navigate("/login")}>
              ← Back to Login
            </div>
          </div>
        </div>

        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Help Center</span>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
