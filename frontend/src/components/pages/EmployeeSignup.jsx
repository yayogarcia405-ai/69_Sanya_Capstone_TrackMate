import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManagerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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
      const response = await fetch("http://localhost:5000/api/auth/employee/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name, // Using name as username
          phone: formData.phone,
          password: formData.password,
          role: "employee",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/employee-login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Server error. Please try again after some time.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#D2B48C]">
      <form className="bg-[#a58352] p-6 rounded-lg shadow-md w-96 text-white" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Manager Signup</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-2 bg-[#C6A679] text-black"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-2 bg-[#C6A679] text-black"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-2 bg-[#C6A679] text-black"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-2 bg-[#C6A679] text-black"
          required
        />

         {/* Upload Face Button (Functionality to be added later) */}
         <button type="button" className="w-full bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#725a3a] mb-2">
          Upload Face (Coming Soon)
        </button>

        <button type="submit" onClick = {handleSubmit} className="w-full bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#725a3a]">
          Sign Up
        </button>
      </form>
    </div>
  );
}
