import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      const response = await fetch("http://localhost:5000/api/auth/employee/signup", {
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
    <div className="flex justify-center items-center h-screen bg-[#c2c0c0]">
      <form className="bg-[#626669] p-8 rounded-lg shadow-md w-96 h-[30rem] flex flex-col justify-center text-white" onSubmit={handleSubmit}>
        
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
        <label className="w-full bg-[#6C757D] text-white py-2 rounded-lg hover:bg-[#818181] text-center cursor-pointer mb-2">
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

        <button type="submit" className="w-full bg-[#343A40] text-white py-2 rounded-lg hover:bg-[#818181]">
          Sign Up
        </button>
      </form>
    </div>
  );
}