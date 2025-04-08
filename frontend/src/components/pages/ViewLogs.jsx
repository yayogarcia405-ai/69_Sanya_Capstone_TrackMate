import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logoimg from "../images/trackmate.png";
import { Settings } from "lucide-react";

const ViewLogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employeeData = location.state?.taskData;

  if (!employeeData) {
    return (
      <div className="bg-[#c2c0c0] min-h-screen flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold text-gray-700">No data available</p>
      </div>
    );
  }

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

      {/* Logs Section */}
      <div className="bg-[#343A40] p-8 mt-10 rounded-xl w-11/12 max-w-4xl shadow-lg">
        <h2 className="text-white text-3xl font-bold text-center mb-4">{employeeData.taskName}</h2>

        <div className="bg-[#495057] p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-white">
            <p><strong>Schedule Time for Check-In:</strong> {employeeData.scheduledCheckIn || "-"}</p>
            <p><strong>Picture Uploaded:</strong></p>
            <p><strong>Time of Check-In:</strong> {employeeData.checkInTime || "-"}</p>
            
            {/* Image with Fallback */}
            {employeeData.uploadedPhoto ? (
              <img
                src={employeeData.uploadedPhoto}
                alt="Uploaded"
                className="h-24 w-24 object-cover border rounded-md bg-gray-700 p-1"
              />
            ) : (
              <div className="h-24 w-24 flex items-center justify-center bg-gray-700 text-gray-300 rounded-md border">
                No Image
              </div>
            )}
            
            <p><strong>Schedule Time for Check-Out:</strong> {employeeData.scheduledCheckOut || "-"}</p>
            <p><strong>Time of Check-Out:</strong> {employeeData.checkOutTime || "-"}</p>

            {/* Location Fix: Corrected Check-In & Check-Out Links */}
            <p><strong>Location Link at Check-In:</strong> 
              {employeeData.checkInLocation ? (
                <a
                  href={employeeData.checkInLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-200 hover:text-blue-400"
                >
                  View Location
                </a>
              ) : "-"}
            </p>
            
            <p><strong>Location Link at Check-Out:</strong> 
              {employeeData.checkOutLocation ? (
                <a
                  href={employeeData.checkOutLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-200 hover:text-blue-400"
                >
                  View Location
                </a>
              ) : "-"}
            </p>

            <p><strong>Status:</strong> {employeeData.status || "Pending"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLogs;
