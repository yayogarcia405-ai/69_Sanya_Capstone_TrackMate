import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logoimg from "../images/logo.png";

export default function EntryPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#D2B48C]">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#A07855] shadow-md">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12" />
          <h1 className="text-3xl font-bold text-black">TrackMate</h1>
        </div>
        <div className="flex gap-4 flex-1 justify-end">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg"
            onClick={() => setShowLoginModal(true)}
          >
            LOGIN
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg"
            onClick={() => setShowSignupModal(true)}
          >
            SIGNUP
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="text-center mt-8">
        <h2 className="text-4xl font-bold text-black">Welcome to TrackMate!</h2>
        <p className="text-lg text-gray-800">
          Effortless Workforce Tracking for Maximum Productivity
        </p>
      </div>

      {/* Feature Boxes */}
      <div className="flex justify-center items-center mt-12 gap-8 px-4">
        {/* Box 1 */}
        <div className="bg-[#B9936C] text-black p-6 rounded-lg shadow-lg w-80 text-center">
          <h3 className="font-bold">Our Mission</h3>
          <p>
            Revolutionizing workforce management with real-time tracking,
            ensuring efficiency and transparency.
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-[#F5DEB3] text-black p-6 rounded-lg shadow-lg w-80 text-center">
          <h3 className="font-bold">What We Do</h3>
          <p>
            Live workforce tracking, automated attendance, and task scheduling
            to boost productivity.
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-[#B9936C] text-black p-6 rounded-lg shadow-lg w-80 text-center">
          <h3 className="font-bold">Why Choose Us?</h3>
          <p>
            Real-time GPS & facial recognition for seamless, reliable attendance
            tracking.
          </p>
        </div>
      </div>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#D2B48C] p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold text-black mb-4">Login as:</h3>
            <button
              className="w-full px-4 py-2 mb-2 bg-black text-white rounded-md"
              onClick={() => navigate("/manager-login")}
            >
              Manager
            </button>
            <button
              className="w-full px-4 py-2 bg-black text-white rounded-md"
              onClick={() => navigate("/employee-login")}
            >
              Employee
            </button>
            <button
              className="mt-4 text-sm text-gray-600 hover:underline"
              onClick={() => setShowLoginModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#D2B48C] p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold text-black mb-4">Sign up as:</h3>
            <button
              className="w-full px-4 py-2 mb-2 bg-black text-white rounded-md"
              onClick={() => navigate("/manager-signup")}
            >
              Manager
            </button>
            <button
              className="w-full px-4 py-2 bg-black text-white rounded-md"
              onClick={() => navigate("/employee-signup")}
            >
              Employee
            </button>
            <button
              className="mt-4 text-sm text-gray-600 hover:underline"
              onClick={() => setShowSignupModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
