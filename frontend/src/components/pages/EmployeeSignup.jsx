import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bgimg from "../images/background2.jpeg";
import Logoimg from "../images/trackmate.png";
import { FiArrowLeft } from "react-icons/fi";

export default function EmployeeSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.name);

      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", "employee");
      
      // This is the critical change - use "document" as the field name
      if (documentFile) {
        formDataToSend.append("document", documentFile);
      }
      for(let pair of formDataToSend.entries()){
        console.log(pair[0],pair[1])
      }

      const response = await fetch(`${import.meta.env.VITE_META_URI}/api/auth/employee/signup`, {
        method: "POST",
        body: formDataToSend, // No Content-Type header needed - browser sets it automatically
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/employee-login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Server error. Please try again.");
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
                                                          className="text-white cursor-pointer absolute left-6 z-50"
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
        
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Signup</h2>
  
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
  
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-3 bg-[#6C757D] text-white placeholder-white"
          required
        />

        {/* Updated file input label */}
        <label className="w-30 text-white py-2 rounded-lg hover:underline text-center cursor-pointer mb-30">
          <span>{documentFile ? "Change Document" : "Upload Document"}</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,image/*" // Specify accepted file types
          />
        </label>
        
        {documentFile && (
          <p className="text-sm text-white mt-1 text-center">
            Selected: {documentFile.name}
          </p>
        )}

        <button type="submit" className="w-full bg-[#343A40] text-white py-2 rounded-lg hover:bg-[#818181] mt-5">
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
}