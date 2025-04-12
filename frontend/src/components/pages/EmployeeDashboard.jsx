import React from "react";
import Logoimg from "../images/trackmate.png"; // Make sure the logo path is correct
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const upcomingTasks = ["Submit daily report", "Attend training session", "Client follow-up call"];
  const completedTasks = ["Team stand-up", "Documentation update"];
  const today = new Date().toLocaleDateString();
  const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-[#c2c0c0] text-black">
      {/* Navbar */}
      <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
        <button
          className="absolute right-8 top-5 text-white"
          onClick={() => navigate("/employee-settings")}
          aria-label="Manager Settings"
        >
          <Settings size={28} />
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-8 px-6">
        <h1 className="text-2xl font-bold text-center text-black mb-1">Welcome User!</h1>
        <p className="text-center mb-6 text-white">{today}</p>

        {/* Upcoming Tasks */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Upcoming Tasks</h3>
          <div className="space-y-3">
            {upcomingTasks.map((task, idx) => (
              <div key={idx} className="bg-[#83868a] px-4 py-3 rounded flex justify-between items-center text-white">
                <p>{task}</p>
                <a href="#" className="text-sm underline text-white hover:text-gray-300">View Task</a>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Tasks Completed</h3>
          <div className="space-y-3">
            {completedTasks.map((task, idx) => (
              <div key={idx} className="bg-[#6C757D] px-4 py-3 rounded flex justify-between items-center text-white">
                <p>{task}</p>
                <a href="#" className="text-sm underline text-white hover:text-gray-300">View Task</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
