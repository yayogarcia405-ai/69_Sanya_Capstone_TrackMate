import React, { useState, useEffect } from "react";
import Logoimg from "../images/trackmate.png";
import { Settings } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDashboard = () => {
  const { employeeId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!employeeId) {
        setError('Employee ID not found in URL');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_META_URI}/api/tasks/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Tasks response for employeeId', employeeId, ':', data); // Debug log

        if (response.ok) {
          setTasks(data);
        } else {
          setError(data.error || 'Failed to fetch tasks');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('An error occurred while fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [employeeId]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter tasks by status based on schema
  const upcomingTasks = tasks.filter(task => task.status === 'upcoming');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  
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
          onClick={() => navigate("/employee-settings")}
          aria-label="Employee Settings"
        >
          <Settings size={28} />
        </button>
      </nav>

      {/* Schedule Section */}
      <div className="bg-[#6C757D] p-8 mt-10 rounded-xl w-11/12 max-w-6xl shadow-lg">
        <h2 className="text-white text-3xl font-bold text-center mb-2">
          Employee Dashboard - {new Date().toLocaleDateString()}
        </h2>
        <p className="text-white text-center mb-6 text-xl">Employee ID: {employeeId}</p>

        {/* Error Message */}
        {error && (
          <div className="text-white text-center mb-4 bg-[#495057] p-2 rounded">
            {error}
          </div>
        )}

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={async () => {
              setLoading(true);
              try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_META_URI}/tasks/${employeeId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) setTasks(data);
                else setError(data.error || 'Failed to fetch tasks');
              } catch (err) {
                console.error('Refresh error:', err);
                setError('An error occurred while refreshing tasks');
              } finally {
                setLoading(false);
              }
            }}
            className="bg-[#495057] text-white px-4 py-2 rounded hover:bg-[#343A40]"
          >
            Refresh Tasks
          </button>
        </div>

        {/* Loading or Content */}
        {loading ? (
          <p className="text-white text-center">Loading tasks...</p>
        ) : (
          <>
            {/* Upcoming Tasks */}
            <div className="bg-[#495057] p-6 rounded-lg">
              <h3 className="text-white text-xl font-bold">Upcoming Tasks ({upcomingTasks.length})</h3>
              {upcomingTasks.length === 0 ? (
                <div className="bg-[#83868a] p-3 my-2 rounded flex justify-between items-center">
                  <p className="text-gray-300">No upcoming tasks</p>
                </div>
              ) : (
                upcomingTasks.map((task) => (
                  <div
                    key={task._id || Math.random()}
                    className="bg-[#83868a] p-3 my-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <span className="text-white block">{task.description || "No description"}</span>
                      <span className="text-gray-300 text-lg"> {/* Changed from text-sm to text-lg */}
                        {task.date || "No date"} at {task.time || "No time"} -{" "}
                        {task.address && task.address.startsWith("http") ? (
                            <a
                              href={task.address}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(task.address, "_blank", "noopener,noreferrer");
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white-400 underline hover:text-blue-300"
                            >
                              📍 Open Location in Maps
                            </a>
                          ) : (
                            <span className="text-gray-400">📍 No location link</span>
                          )}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="text-gray-300 underline hover:cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/view-task/${task._id}`);
                      }}
                    >
                      View Task
                    </a>
                  </div>
                ))
              )}
            </div>

            {/* Completed Tasks */}
            <div className="bg-[#495057] p-6 rounded-lg mt-6">
              <h3 className="text-white text-xl font-bold">Completed Tasks ({completedTasks.length})</h3>
              {completedTasks.length === 0 ? (
                <div className="bg-[#83868a] p-3 my-2 rounded flex justify-between items-center">
                  <p className="text-gray-300">No completed tasks</p>
                </div>
              ) : (
                
                completedTasks.map((task) => (
                  <div
                    key={task._id || Math.random()}
                    className="bg-[#83868a] p-3 my-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <span className="text-white block">{task.description || "No description"}</span>
                      
                    </div>
                    <a
                      href="#"
                      className="text-gray-300 underline hover:cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/view-logs/${task._id}`);
                      }}
                    >
                      View Logs
                    </a>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;