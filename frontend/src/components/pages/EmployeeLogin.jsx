import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logoimg from "../images/trackmate.png";
import Bgimg from "../images/background2.jpeg";
import { FiArrowLeft } from "react-icons/fi";

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
    <div
          className="w-full min-h-screen bg-[#c2c0c0] flex flex-col relative"
          style={{
            backgroundImage: `url(${Bgimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            opacity: 80, // Increased for better visibility
            // filter: "blur(2px)", // Subtle blur to make content pop
          }}
        >
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-transparent z-0"></div>
    
          {/* Navbar */}
          <nav className="w-full flex  items-center px-8 py-5 bg-[#343A40]/50 backdrop-blur-md shadow-md h-20 relative z-10">
          <FiArrowLeft
                  className="ml-4 text-white cursor-pointer z-50"
                  size={25}
                  onClick={() => navigate("/")}
                />
            <div className="flex items-center flex-1 justify-center absolute left-0 right-0">
              <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
              <h1 className="text-3xl font-bold text-white drop-shadow-md">TrackMate</h1>
            </div>
          </nav>
          <div className="flex items-center justify-center min-h-screen">
          <form
    className="bg-black/40 backdrop-blur-md border border-white/30 hover:bg-white/10 text-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center cursor-pointer hover:-translate-y-2 transition-transform duration-300"
    onSubmit={handleSubmit}
  >
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
    </div>
  );
};