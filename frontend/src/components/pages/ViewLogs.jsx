import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logoimg from "../images/trackmate.png";
import { Settings } from "lucide-react";

const ViewLogs = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState({ checkIn: false, checkOut: false });
  
  useEffect(() => {
    const fetchTaskLogs = async () => {
      try {
        setLoading(true);
        if (!taskId) {
          console.error("taskId is undefined");
          return;
        }
        const response = await fetch(`${import.meta.env.VITE_META_URI}/api/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ taskId }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch task logs: ${response.status}`);
        }

        const data = await response.json();
        console.log("taskId:", taskId);
        console.log("Fetched task data (full):", data);
        console.log("Check-In Photo (raw):", data.log?.checkInPhoto);
        console.log("Check-Out Photo (raw):", data.log?.checkOutPhoto);
        setTask(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTaskLogs();
    } else {
      setError("No task ID provided");
      setLoading(false);
    }
  }, [taskId]);

  if (loading) {
    return (
      <div className="bg-[#c2c0c0] min-h-screen flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="bg-[#c2c0c0] min-h-screen flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold text-gray-700">
          {error || "No data available"}
        </p>
      </div>
    );
  }

  // Format date with time first
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  };

  // Capitalize status
  const formattedStatus = task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : "Pending";

  return (
    <div className="bg-[#c2c0c0] min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
      </nav>

      {/* Logs Section */}
      <div className="bg-[#343A40] p-8 mt-10 rounded-xl w-11/12 max-w-4xl shadow-lg">
        <h2 className="text-white text-3xl font-bold text-center mb-6">{task.description || "Task"}</h2>

        <div className="bg-[#495057] p-6 rounded-lg">
          <div className="flex justify-between">
            {/* Left Side: Check-In Details */}
            <div className="w-1/2 pr-4">
              <h3 className="text-xl font-bold mb-4 text-white">Check-In Details</h3>
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Schedule Time for Check-In:</strong>{" "}
                <span className="font-bold">{task.time || "-"}</span>
              </p>
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Time of Check-In:</strong>{" "}
                <span className="font-bold">{formatDateTime(task.log?.checkInTime)}</span>
              </p>
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Picture Uploaded (Check-In):</strong>
              </p>
              {task.log?.checkInPhoto && !imageError.checkIn ? (
                <img
                  src={task.log.checkInPhoto}
                  alt="Check-In"
                  className="w-40 h-40 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    console.error("Failed to load check-in image:", e);
                    setImageError((prev) => ({ ...prev, checkIn: true }));
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-24 h-24 bg-[#444] flex items-center justify-center rounded-lg mb-4 text-white">
                  No image
                </div>
              )}
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Location Link at Check-In:</strong>{" "}
                {task.log?.checkInLocation ? (
                  <a
                    href={`${task.log.checkInLocation}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-200 hover:text-blue-400 font-bold"
                  >
                    View Location
                  </a>
                ) : (
                  <span className="font-bold">-</span>
                )}
              </p>
            </div>

            {/* Right Side: Check-Out Details and Status */}
            <div className="w-1/2 pl-4">
              <h3 className="text-xl font-bold mb-4 text-white">Check-Out Details</h3>
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Time of Check-Out:</strong>{" "}
                <span className="font-bold">{formatDateTime(task.log?.checkOutTime)}</span>
              </p>
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Picture Uploaded (Check-Out):</strong>
              </p>
              {task.log?.checkOutPhoto && !imageError.checkOut ? (
                <img
                  src={task.log.checkOutPhoto}
                  alt="Check-Out"
                  className="w-40 h-40 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    console.error("Failed to load check-out image:", e);
                    setImageError((prev) => ({ ...prev, checkOut: true }));
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-24 h-24 bg-[#444] flex items-center justify-center rounded-lg mb-4 text-white">
                  No image
                </div>
              )}
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Location Link at Check-Out:</strong>{" "}
                {task.log?.checkOutLocation ? (
                  <a
                    href={`${task.log.checkOutLocation}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-200 hover:text-blue-400 font-bold"
                  >
                    View Location
                  </a>
                ) : (
                  <span className="font-bold">-</span>
                )}
              </p>
              <p className="text-lg mb-4 text-white">
                <strong className="font-normal">Status:</strong>{" "}
                <span className="font-bold">{formattedStatus}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLogs;