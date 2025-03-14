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
      const response = await axios.post("http://localhost:5000/api/auth/verify-reset-otp", { email, otp });
      setMessage(response.data.message);
      navigate("/reset-password"); // Redirect to reset password page
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#D2B48C]">
      <form className="bg-[#a58352] p-6 rounded-lg shadow-md w-96 text-white" onSubmit={handleVerifyOtp}>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Verify OTP</h2>
        <p className="text-center text-sm mb-4 text-black">An OTP has been sent to your email.</p>

        <p className="text-center text-sm mb-2 text-black font-semibold">{email}</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg mb-2 bg-[#C6A679] text-black"
        />

        <button type="submit" className="w-full bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#725a3a]">
          Verify OTP
        </button>

        {message && <p className="text-center text-sm mt-4 text-green-300">{message}</p>}
      </form>
    </div>
  );
};
export default VerifyResetOtp;
