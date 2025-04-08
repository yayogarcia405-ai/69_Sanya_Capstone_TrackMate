import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logoimg from "../images/trackmate.png";
import { Settings } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";


const ViewSchedule = () => {
  const { employeeId } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!employeeId) return; // don't run if it's not ready
  
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tasks/${employeeId}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTasks();
  }, [employeeId]);

  const handleRemoveUser = () => setShowConfirm(true);

  const confirmRemoveUser = () => {
    // Remove user logic here
    setShowConfirm(false);
    navigate("/manager-dashboard");
  };

  const handleViewLogs = (task) => {
    navigate("/view-logs", { state: { taskData: task } });
  };


  // Separate tasks into upcoming and completed
  const upcomingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  return (
    <div className="bg-[#c2c0c0] min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
        <button
          className="absolute right-8 top-5 text-white"
          onClick={() => navigate("/manager-settings")}
        >
          <Settings size={28} />
        </button>
      </nav>

      {/* Schedule Section */}
      <div className="bg-[#6C757D] p-8 mt-10 rounded-xl w-11/12 max-w-6xl shadow-lg">
        <h2 className="text-white text-3xl font-bold text-center mb-2">View Schedule - {new Date().toLocaleDateString()}</h2>
        <p className="text-white text-center mb-6 text-xl"> Employee ID: {employeeId}</p>

{/* Upcoming Tasks */}
<div className="bg-[#495057] p-6 rounded-lg">
          <h3 className="text-white text-xl font-bold">Upcoming Tasks ({upcomingTasks.length})</h3>
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-300 mt-2">No upcoming tasks</p>
          ) : (
            upcomingTasks.map(task => (
              <div key={task.date} className="bg-[#83868a] p-3 my-2 rounded flex justify-between items-center">
                <div>
                  <span className="text-white block">{task.description}</span>
                  <span className="text-gray-300 text-sm">
                    {task.date} at {task.time} - {task.address}
                  </span>
                </div>
                <button 
                  className="text-gray-300 underline hover:cursor-pointer"
                  onClick={() => handleViewLogs(task)}
                >
                  View Logs
                </button>
              </div>
            ))
          )}
        </div>

        {/* Completed Tasks */}
        <div className="bg-[#495057] p-6 rounded-lg mt-6">
          <h3 className="text-white text-xl font-bold">Completed Tasks ({completedTasks.length})</h3>
          {completedTasks.length === 0 ? (
            <p className="text-gray-300 mt-2">No completed tasks</p>
          ) : (
            completedTasks.map(task => (
              <div key={task.date} className="bg-[#83868a] p-3 my-2 rounded flex justify-between items-center">
                <div>
                  <span className="text-white block">{task.description}</span>
                  <span className="text-gray-300 text-sm">
                    Completed on {task.completedDate}
                  </span>
                </div>
                <button 
                  className="text-gray-300 underline hover:cursor-pointer"
                  onClick={() => handleViewLogs(task)}
                >
                  View Logs
                </button>
              </div>
            ))
          )}
        </div>

        {/* Remove User Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={handleRemoveUser} 
            className="bg-[#495057] text-white px-6 py-2 rounded text-lg hover:bg-[#343A40]"
          >
            Remove User
          </button>
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold mb-4">Are you sure you want to remove this user?</p>
            <div className="flex justify-center gap-4">
              <button onClick={confirmRemoveUser} className="bg-[#495057] text-white px-4 py-2 rounded">Yes</button>
              <button onClick={() => setShowConfirm(false)} className="bg-[#6C757D] text-white px-4 py-2 rounded">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSchedule;