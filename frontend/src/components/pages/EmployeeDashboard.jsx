// client/src/components/EmployeeDashboard.jsx
import React, { useState, useEffect } from "react";
import Logoimg from "../images/trackmate.png";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toLocaleDateString();
  const navigate = useNavigate();

  // Get userId from localStorage (set during login)
  const userId = localStorage.getItem("userId"); // e.g., "nahda"

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) {
        setError("Please log in to view tasks");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_META_URI}/tasks/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasks = await response.json();
        // Filter tasks by status
        setUpcomingTasks(tasks.filter((task) => task.status === "upcoming"));
        setCompletedTasks(tasks.filter((task) => task.status === "completed"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

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
          aria-label="Employee Settings"
        >
          <Settings size={28} />
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-8 px-6">
        <h1 className="text-2xl font-bold text-center text-black mb-1">
          Welcome, {userId || "User"}!
        </h1>
        <p className="text-center mb-6 text-white">{today}</p>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-white">Loading tasks...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Upcoming Tasks */}
        {!loading && !error && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Upcoming Tasks</h3>
            <div className="space-y-3">
              {upcomingTasks.length === 0 ? (
                <p className="text-white">No upcoming tasks.</p>
              ) : (
                upcomingTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-[#83868a] px-4 py-3 rounded flex justify-between items-center text-white"
                  >
                    <p>{task.title}</p>
                    <a
                      href="#"
                      className="text-sm underline text-white hover:text-gray-300"
                      onClick={() => navigate(`/task/${task._id}`)} // Optional: Navigate to task details
                    >
                      View Task
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {!loading && !error && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Tasks Completed</h3>
            <div className="space-y-3">
              {completedTasks.length === 0 ? (
                <p className="text-white">No completed tasks.</p>
              ) : (
                completedTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-[#6C757D] px-4 py-3 rounded flex justify-between items-center text-white"
                  >
                    <p>{task.title}</p>
                    <a
                      href="#"
                      className="text-sm underline text-white hover:text-gray-300"
                      onClick={() => navigate(`/task/${task._id}`)}
                    >
                      View Task
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;