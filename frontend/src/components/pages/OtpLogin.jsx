import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/otp-login", { email });
      console.log("Response Data:", response.data);
  
      if (response.status === 200 && response.data.message === "OTP sent successfully.") {
        // alert("OTP sent successfully!");
        localStorage.setItem("otpEmail", email); 
        navigate("/verify-otp");
      } else {
        alert("Error sending OTP");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      alert("Error sending OTP");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#D2B48C]">
      <div className="bg-[#a58352] p-6 rounded-lg shadow-md w-96 text-white">
        <h2 className="text-xl font-bold mb-4 text-center text-black">Login with OTP</h2>
  
        {/* Email Input */}
        {!otpSent && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4 bg-[#C6A679] text-black"
            />
            <button
              onClick={handleSendOtp}
              className={`w-full p-2 bg-[#8B6F47] text-white rounded ${loading && "opacity-50 cursor-not-allowed"}`}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}
  
        {/* OTP Input */}
        {/* {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4 bg-[#C6A679] text-black"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full p-2 bg-[#8B6F47] text-white rounded"
            >
              Verify OTP
            </button>
          </>
        )} */}
      </div>
    </div>
  );
};  

export default OtpLogin;
