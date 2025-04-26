import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerifyE = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("otpEmail");
    if (storedEmail) {
      setEmail(storedEmail); // Auto-fill email
    }
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("🔹 Sending OTP Verification Request:", { email, otp });

    try {
      const response = await axios.post(`${import.meta.env.VITE_META_URI}/api/auth/verify-otp`, { email, otp });
      console.log("🔹 Server Response:", response.data);

      if (response.data.success) {
        setMessage("OTP Verified Successfully! Redirecting...");

        // Extract userId (handle different field names)
        const userId = response.data.userId || response.data._id || response.data.id;
        if (!userId) {
          console.error("🔹 Error: userId not found in response");
          setMessage("Error: User ID not returned by server. Contact support.");
          return;
        }

        // Store userId, role, and token in localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);
        localStorage.removeItem("otpEmail"); // Clear stored email

        console.log("🔹 Navigating to:", `/employee-dashboard/${userId}`);
        setTimeout(() => {
          navigate(`/employee-dashboard/${userId}`); // Navigate with userId
        }, 2000);
      } else {
        setMessage(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("🔹 OTP Verification Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#c2c0c0]">
      <form className="bg-[#626669] p-6 rounded-lg shadow-md w-96 text-white" onSubmit={handleVerifyOtp}>
        <h2 className="text-xl font-bold mb-4 text-center text-white">Verify OTP</h2>
        {message && (
          <p className={`text-sm text-center mb-3 ${message.includes("Success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <input
          type="email"
          name="email"
          value={email}
          disabled
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
        />

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />

        <button type="submit" className="w-full bg-[#343A40] text-white py-2 rounded-lg hover:bg-[#818181]">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerifyE;