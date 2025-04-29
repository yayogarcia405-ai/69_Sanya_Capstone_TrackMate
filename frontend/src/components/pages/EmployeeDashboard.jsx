import React, { useState, useEffect } from "react";
import Logoimg from "../images/trackmate.png";
import { Settings } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeDashboard = () => {
  const { employeeId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [employee, setEmployee] = useState(null); // Store full employee data
  const [department, setDepartment]=useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Motivational messages pool
  const motivationalMessages = [
    "You're crushing it! Keep up the momentum!",
    "Great job! You're almost there, stay focused!",
    "Amazing progress! Let's finish strong!",
    "You're unstoppable today! Keep shining!",
    "Well done! Your hard work is paying off!"
  ];

  // Function to generate motivational alert based on task progress
  const generateMotivationalAlert = (completedCount, totalCount) => {
    if (totalCount === 0) {
      toast.info("No tasks yet? Let's get started!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
      });
      return;
    }

    const progressPercentage = Math.round((completedCount / totalCount) * 100);
    let message;

    if (progressPercentage >= 80) {
      message = `${
        motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
      } You're ${progressPercentage}% done with your day!`;
    } else if (progressPercentage >= 50) {
      message = `Nice work! You're ${progressPercentage}% through your tasks. Keep it up!`;
    } else {
      message = `You're making progress! ${progressPercentage}% done. Let's do this!`;
    }

    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
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

        // Fetch tasks
        const taskResponse = await fetch(`${import.meta.env.VITE_META_URI}/api/tasks/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const taskData = await taskResponse.json();
        console.log('Tasks response for employeeId', employeeId, ':', taskData);

        if (taskResponse.ok) {
          setTasks(taskData);
          const completedCount = taskData.filter(task => task.status === 'completed').length;
          const totalCount = taskData.length;
          generateMotivationalAlert(completedCount, totalCount);
        } else {
          setError(taskData.error || 'Failed to fetch tasks');
        }

        const employeeResponse = await fetch(`${import.meta.env.VITE_META_URI}/api/auth/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const employeeData = await employeeResponse.json();
        console.log('Employee response:', employeeData);

        if (employeeResponse.ok) {
          const employee = employeeData.find(emp => emp._id === employeeId);
          if (employee) {
            setEmployee(employee); // Store full employee object
          } else {
            setError('Employee not found');
          }
        } else {
          setError(employeeData.message || 'Failed to fetch employee data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          onClick={() => navigate(`/employee-settings/${employeeId}`)}
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
        <p className="text-white text-center mb-1 text-xl">Employee ID: {employeeId}</p>
        <p className="text-white text-center mb-6 text-xl">Department: {employee?.department?.name || "No department assigned"}</p>

        {/* Error Message */}
        {error && (
          <div className="text-white text-center mb-4 bg-[#495057] p-2 rounded">
            {error}
          </div>
        )}

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
                      <span className="text-gray-300 text-lg">
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
      <ToastContainer
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
      <style>
        {`
          .custom-toast {
            background-color: #495057;
            color: #ffffff;
            border-radius: 8px;
            padding: 12px;
            margin-top: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            font-family: inherit;
          }
          .custom-toast-body {
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
          }
          .Toastify__progress-bar {
            background-color: #83868a;
          }
          .Toastify__close-button {
            color: #ffffff;
            opacity: 0.7;
          }
          .Toastify__close-button:hover {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default EmployeeDashboard;