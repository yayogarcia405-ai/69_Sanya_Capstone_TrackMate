import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logoimg from "../images/trackmate.png";
import { Settings } from "lucide-react";

const ViewTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInPhoto, setCheckInPhoto] = useState(null);
  const [checkOutPhoto, setCheckOutPhoto] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const checkInVideoRef = useRef(null);
  const checkOutVideoRef = useRef(null);
  const checkInCanvasRef = useRef(null);
  const checkOutCanvasRef = useRef(null);
  const [isCheckInReady, setIsCheckInReady] = useState(false);
  const [isCheckOutReady, setIsCheckOutReady] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) {
        setError("Task ID not found in URL");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_META_URI}/tasks/id/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch task");

        const data = await response.json();
        console.log("Fetched task data for taskId", taskId, ":", data); // Enhanced debug log
        setTask(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching the task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const initializeStream = async (videoRef, setReady) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        const checkReadiness = () => {
          if (videoRef.current.readyState >= 2) {
            setReady(true);
          } else {
            setTimeout(checkReadiness, 300);
          }
        };
        checkReadiness();
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Failed to access camera.");
    }
  };

  const stopStream = (videoRef, setReady) => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setReady(false);
    }
  };

  const startCamera = (videoRef, setReady) => {
    stopStream(videoRef, setReady); // ensure previous streams are closed
    initializeStream(videoRef, setReady);
  };

  const capturePhoto = (canvasRef, setPhoto, videoRef, setTime, setReady) => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 300, 225);
      const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
      setPhoto(imageDataUrl);
      setTime(new Date().toLocaleString());
    } else {
      setError("Video not ready for capture.");
    }
    stopStream(videoRef, setReady);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!checkInPhoto || !checkOutPhoto) {
        alert("Capture both Check-In and Check-Out photos!");
        return;
      }

      await fetch(`${import.meta.env.VITE_META_URI}/tasks/id/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Completed", checkInTime, checkOutTime }),
      });

      await fetch(`${import.meta.env.VITE_META_URI}/tasks/id/${taskId}/photo/check-in`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: checkInPhoto.split(",")[1],
      });

      await fetch(`${import.meta.env.VITE_META_URI}/tasks/id/${taskId}/photo/check-out`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: checkOutPhoto.split(",")[1],
      });

      alert("Task completed and photos uploaded!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving task or uploading photos.");
    }
  };

  useEffect(() => {
    return () => {
      stopStream(checkInVideoRef, setIsCheckInReady);
      stopStream(checkOutVideoRef, setIsCheckOutReady);
    };
  }, []);

  if (loading) return <div className="text-center mt-10 text-white">Loading task...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#c2c0c0] flex flex-col items-center">
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
      <div className="bg-[#83868a] mt-10 p-8 rounded-xl w-11/12 max-w-4xl shadow-lg text-white">
        <h2 className="text-center text-3xl font-bold mb-2">Task Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-In Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Check-In</h3>
            <button
              onClick={() => startCamera(checkInVideoRef, setIsCheckInReady)}
              className="w-full mb-3 py-2 rounded bg-[#6C757D] hover:bg-[#495057]"
            >
              Open Camera
            </button>
            <video ref={checkInVideoRef} autoPlay style={{ display: checkInPhoto ? "none" : "block", width: "300px" }} />
            <canvas ref={checkInCanvasRef} style={{ display: "none", width: "300px" }} />
            {checkInPhoto && <img src={checkInPhoto} alt="Check-In" style={{ width: "300px", marginTop: "10px" }} />}
            <button
              onClick={() =>
                capturePhoto(checkInCanvasRef, setCheckInPhoto, checkInVideoRef, setCheckInTime, setIsCheckInReady)
              }
              className="w-full mt-3 py-2 rounded bg-[#6C757D] hover:bg-[#495057]"
              disabled={!isCheckInReady}
            >
              Capture Photo
            </button>
            {checkInPhoto && <p className="text-green-500 mt-2">Check-In photo captured!</p>}
            {checkInTime && <p className="text-white mt-2">Check-In Time: {checkInTime}</p>}
          </div>

          {/* Check-Out Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Check-Out</h3>
            <button
              onClick={() => startCamera(checkOutVideoRef, setIsCheckOutReady)}
              className="w-full mb-3 py-2 rounded bg-[#6C757D] hover:bg-[#495057]"
            >
              Open Camera
            </button>
            <video ref={checkOutVideoRef} autoPlay style={{ display: checkOutPhoto ? "none" : "block", width: "300px" }} />
            <canvas ref={checkOutCanvasRef} style={{ display: "none", width: "300px" }} />
            {checkOutPhoto && <img src={checkOutPhoto} alt="Check-Out" style={{ width: "300px", marginTop: "10px" }} />}
            <button
              onClick={() =>
                capturePhoto(checkOutCanvasRef, setCheckOutPhoto, checkOutVideoRef, setCheckOutTime, setIsCheckOutReady)
              }
              className="w-full mt-3 py-2 rounded bg-[#6C757D] hover:bg-[#495057]"
              disabled={!isCheckOutReady}
            >
              Capture Photo
            </button>
            {checkOutPhoto && <p className="text-green-500 mt-2">Check-Out photo captured!</p>}
            {checkOutTime && <p className="text-white mt-2">Check-Out Time: {checkOutTime}</p>}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-[#495057] text-white py-2 px-6 rounded hover:bg-[#343A40] block mx-auto"
        >
          Save Task
        </button>
      </div>
    </div>
  );
};

export default ViewTask;