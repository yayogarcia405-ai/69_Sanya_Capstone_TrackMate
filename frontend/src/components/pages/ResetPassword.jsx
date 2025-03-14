import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail"); // Get stored email

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", { email, newPassword });
      setMessage(response.data.message);
    //   setSuccess(true); 
      localStorage.removeItem("resetEmail"); // Clear stored email/
    //   navigate("/");
      setTimeout(() => {
        navigate("/"); // Redirect to login page
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#D2B48C]">
      <form className="bg-[#a58352] p-6 rounded-lg shadow-md w-96 text-white" onSubmit={handleResetPassword}>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Reset Password</h2>
        <p className="text-center text-sm mb-4 text-black font-semibold">{email}</p>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg mb-2 bg-[#C6A679] text-black"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg mb-2 bg-[#C6A679] text-black"
        />

        <button type="submit" className="w-full bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#725a3a]">
          Reset Password
        </button>

        {message && <p className="text-center text-sm mt-4 text-green-300">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
