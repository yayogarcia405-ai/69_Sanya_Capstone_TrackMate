import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_META_URI}/api/auth/forgot-password`, { email });
      setMessage(response.data.message);
      localStorage.setItem("resetEmail", email); // Store email for next step
      navigate("/verify-reset-otp"); // Redirect to OTP verification page
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#c2c0c0]">
      <form className="bg-[#626669] p-8 rounded-lg shadow-md w-96  flex flex-col justify-center text-white" onSubmit={handleSendOtp}>
        
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Forgot Password</h2>
        <p className="text-center text-sm mb-4 text-white">Enter your email to receive an OTP.</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
        />

<button type="submit" className="w-full bg-[#343A40] text-white py-2 rounded-lg hover:bg-[#818181]">
          Send OTP
        </button>

        {message && <p className="text-center text-sm mt-4 text-green-300">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
