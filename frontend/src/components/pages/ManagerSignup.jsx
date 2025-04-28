import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bgimg from "../images/background2.jpeg";

export default function ManagerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_META_URI}/api/auth/manager/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name, // Using name as username
          email: formData.email,
          password: formData.password,
          roles: "manager",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/manager-login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Server error. Please try again after some time.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#c2c0c0]"
    style={{
          backgroundImage: `url(${Bgimg})`, // Set image as background
          backgroundSize: 'cover', // Make sure the image covers the area
          backgroundPosition: 'center', // Position the image center
        }}>
      <form className="bg-black/40 backdrop-blur-md border border-white/30 hover:bg-white/10  text-white p-8 rounded-2xl shadow-xl w-100 text-center cursor-pointer  hover:-translate-y-2" onSubmit={handleSubmit}>
        
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Manager Signup</h2>
  
        {/* Error Message */}
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
  
        {/* Full Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />
  
        {/* Email Address */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />
  
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />
  
        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-5 bg-[#6C757D] text-white placeholder-white"
          required
        />
  
        {/* Signup Button */}
        <button type="submit" className="w-full bg-[#343A40] text-white py-2 rounded-lg hover:bg-[#818181]">
          Sign Up
        </button>
        
      </form>
    </div>
  );
  
}
