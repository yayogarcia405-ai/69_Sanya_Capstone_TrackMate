import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_META_URI}/api/auth/employee/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Store userId, role, and token in localStorage
        localStorage.setItem("userId", data.userId); // e.g., MongoDB _id
        localStorage.setItem("role", data.role); // e.g., "employee"
        localStorage.setItem("token", data.token);
        // Redirect to dashboard with userId in URL
        navigate(`/employee-dashboard/${data.userId}`);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Server error. Please try again after some time.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#c2c0c0]">
      <form className="bg-[#626669] p-8 rounded-lg shadow-md w-96 h-[26rem] flex flex-col justify-center text-white" onSubmit={handleSubmit}>
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Employee Login</h2>
        
        {/* Error Message */}
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        
        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg mb-4 bg-[#6C757D] text-white placeholder-white"
          required
        />
        
        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg mb-6 bg-[#6C757D] text-white placeholder-white"
          required
        />
  
        {/* Login Button */}
        <button type="submit" className="w-full bg-[#343A40] text-white py-3 rounded-lg hover:bg-[#818181] mb-6">
          Login
        </button>
  
        {/* Additional Options */}
        <div className="flex justify-between text-sm">
          <button type="button" className="text-white underline" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </button>
          <button type="button" className="text-white underline" onClick={() => navigate("/otp-login-e")}>
            Login with OTP
          </button>
        </div>
      </form>
    </div>
  );
};