import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Bgimg from "../images/background2.jpeg";

const OtpVerifyM = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
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
        // Store userId, role, and token in localStorage
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);
        localStorage.removeItem("otpEmail"); // Clear stored email
        setTimeout(() => {
          navigate(`/manager-dashboard/${response.data.userId}`); // Navigate with userId
        }, 2000);
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying OTP");
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-[#c2c0c0]"
    style={{
          backgroundImage: `url(${Bgimg})`, // Set image as background
          backgroundSize: 'cover', // Make sure the image covers the area
          backgroundPosition: 'center', // Position the image center
        }}>
      <form
        className="bg-black/40 backdrop-blur-md border border-white/30 hover:bg-white/10  text-white p-8 rounded-2xl shadow-xl w-100 text-center cursor-pointer  hover:-translate-y-2"
        onSubmit={handleVerifyOtp}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>

        {message && <p className={`text-sm text-center mb-3 ${message.includes("Success") ? "text-green-400" : "text-red-400"}`}>{message}</p>}
        <input
          type="email"
          name="email"
          value={email}
          disabled
          aria-label="Email (read-only)"
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

        <button
          type="submit"
          className="w-full bg-[#343A40] text-white py-2 rounded-lg hover:bg-[#818181] transition-colors duration-300"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerifyM;
