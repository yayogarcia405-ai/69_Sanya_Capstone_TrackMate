import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail"); // Get stored email

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_META_URI}/api/auth/verify-reset-otp`, { email, otp });
      setMessage(response.data.message);
      navigate("/reset-password"); // Redirect to reset password page
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#c2c0c0]">
      <form className="bg-[#626669] p-8 rounded-lg shadow-md w-96  flex flex-col justify-center text-white" onSubmit={handleVerifyOtp}>
        
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Verify OTP</h2>
        <p className="text-center text-sm mb-4 text-white">An OTP has been sent to your email.</p>

        <p className="text-center text-sm mb-2 text-white font-semibold">{email}</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
        />

<button type="submit" className="w-full bg-[#343A40] text-white py-2 rounded-lg hover:bg-[#818181]">
          Verify OTP
        </button>

        {message && <p className="text-center text-sm mt-4 text-green-300">{message}</p>}
      </form>
    </div>
  );
};
export default VerifyResetOtp;
