import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./forgotpassword.css";
import { baseURL } from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${baseURL}/auth/forgot-password?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      console.log("FORGOT PASSWORD RESPONSE 👉", data);

      if (!response.ok) {
        alert(data.detail || "Failed to send OTP");
        return;
      }

      alert("OTP sent successfully!");
      // ✅ Move to OTP page and pass email
      navigate("/otp", { state: { email } });
    } catch (error) {
      console.error("FORGOT PASSWORD ERROR 👉", error);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="forgot-container">
        <div className="forgot-card">
          <div className="icon">🔐</div>

          <h2>Forgot Password?</h2>
          <p>
            Enter your registered email address and we’ll send you an OTP to reset
            your password.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
          </form>

          <div className="back-link" onClick={() => navigate("/login")}>
            ← Back to Login
          </div>

          <div className="support">
            Need help? <span>Contact Support</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
