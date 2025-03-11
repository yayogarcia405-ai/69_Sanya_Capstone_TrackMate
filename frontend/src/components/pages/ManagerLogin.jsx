import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManagerLogin() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/manager/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/manager-dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Server error. Please try again after some time.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#D2B48C]">
      <form className="bg-[#a58352] p-6 rounded-lg shadow-md w-96 text-white" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Manager Login</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}

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

        <div className="flex justify-between text-sm mb-2">
          <button type="button" className="text-black underline">Forgot Password?</button>
          <button type="button" className="text-black underline">Login with OTP</button>
        </div>

        <button type="submit" className="w-full bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#725a3a]">
          Login
        </button>
      </form>
    </div>
  );
}

export function ManagerDashboard() {
  return (
    <div className="h-screen w-full bg-white">
      <nav className="p-4 bg-gray-100 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">Logo</div>
        <button>
          <span className="text-black text-2xl">⚙</span>
        </button>
      </nav>
    </div>
  );
}
