import React, { useState } from "react";
import Logoimg from "../images/trackmate.png";
import { useParams, useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import axios from "axios";
const AddTask = () => {
  const { employeeId } = useParams();
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    address: "",
    pincode: "",
    city: "",
    time: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_META_URI}/api/add-tasks`, {
      ...formData,
      employeeId,
    });
    alert("Task added!");
    navigate(`/manager/view-schedule/${employeeId}`);
  } catch (error) {
    console.error(error);
    alert("Failed to add task");
  }
  };

  return (
    <div className="bg-[#c2c0c0] min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
        
      </nav>

      {/* Form Container */}
      <div className="bg-[#6C757D] p-8 mt-10 rounded-xl w-11/12 max-w-6xl shadow-lg">
        <h2 className="text-white text-3xl font-bold text-center mb-2">Add Task</h2>
        <p className="text-white text-center mb-6 text-xl">Employee ID- {employeeId}</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-white text-lg mb-1">Select Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="px-3 py-2 rounded bg-[#495057] text-white" required />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-lg mb-1">Add Address (link)</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="px-3 py-2 rounded bg-[#495057] text-white" required />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-lg mb-1">Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="px-3 py-2 rounded bg-[#495057] text-white" required />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-lg mb-1">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="px-3 py-2 rounded bg-[#495057] text-white" required />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-lg mb-1">Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} className="px-3 py-2 rounded bg-[#495057] text-white" required />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-white text-lg mb-1">Task Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="px-3 py-2 rounded bg-[#495057] text-white w-full" required />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button type="submit" className="bg-[#343A40] text-white px-6 py-2 rounded text-lg mt-4">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
