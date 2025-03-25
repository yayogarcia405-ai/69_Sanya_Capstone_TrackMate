import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logoimg from "../images/trackmate.png";

export default function EntryPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#c2c0c0]">
      {/* navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-5 bg-[#343A40] shadow-md h-20">
  <div className="flex-1"></div>
  <div className="flex items-center ">
  <img src={Logoimg} alt="TrackMate Logo" className="h-25 w-25 object-contain brightness-80 contrast-150" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
        <div className="flex gap-4 flex-1 justify-end">
          <button
            className="px-4 py-2 bg-[#495057] text-white rounded-lg"
            onClick={() => setShowLoginModal(true)}
          >
            LOGIN
          </button>
          <button
            className="px-4 py-2 bg-[#495057] text-white rounded-lg"
            onClick={() => setShowSignupModal(true)}
          >
            SIGNUP
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="text-center mt-8">
      <h2 className="text-4xl font-bold text-black mb-4">Welcome to TrackMate!</h2>
<p className="text-lg text-gray-800 mt-2">
  Effortless Workforce Tracking for Maximum Productivity.
</p>
</div>

      {/* Feature Boxes */}
<div className="flex justify-center items-center mt-16 gap-8 px-4">
  {/* Box 1 */}
  <div className="bg-[#83868a] text-white p-6 rounded-lg shadow-md w-80 text-center">
    <h3 className="font-bold">Our Mission</h3>
    <p>
      Revolutionizing workforce management with real-time tracking,
      ensuring efficiency and transparency.
    </p>
  </div>

  {/* Box 2 */}
  <div className="bg-[#6C757D] text-white p-6 rounded-lg shadow-lg w-80 text-center">
    <h3 className="font-bold">What We Do</h3>
    <p>
      Live workforce tracking, automated attendance, and task scheduling
      to boost productivity.
    </p>
  </div>

  {/* Box 3 */}
  <div className="bg-[#83868a] text-white p-6 rounded-lg shadow-md w-80 text-center">
    <h3 className="font-bold">Why Choose Us?</h3>
    <p>
    Real-time GPS & facial recognition for seamless attendance tracking andensuring efficiency in work.
    </p>
  </div>
</div>

   {/* Login Modal */}
   {showLoginModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-[#c2c0c0]">
    <div className="bg-[#83868a] p-8 rounded-lg shadow-2xl w-[28rem] flex flex-col items-center">
      
      {/* Logo and App Name */}
      <div className="flex flex-row items-center mb-6">
        <img src={Logoimg} alt="TrackMate Logo" className="h-20 w-20 object-contain mb-2" />
        <h2 className="text-2xl font-bold text-white">TrackMate</h2>
      </div>

      {/* Login Options */}
      <h3 className="text-lg font-bold text-white mb-4">Login as:</h3>
      <button
        className="w-full px-4 py-3 mb-3 bg-[#495057] text-white rounded-md"
        onClick={() => navigate("/manager-login")}
      >
        Manager
      </button>
      <button
        className="w-full px-4 py-3 bg-[#495057] text-white rounded-md"
        onClick={() => navigate("/employee-login")}
      >
        Employee
      </button>

      {/* Close Button */}
      <button
        className="mt-6 text-sm text-white hover:underline"
        onClick={() => setShowLoginModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* Signup Modal */}
      {showSignupModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-[#c2c0c0]">
    <div className="bg-[#83868a] p-8 rounded-lg shadow-2xl w-[28rem] flex flex-col items-center">

      {/* Logo and App Name */}
      <div className="flex flex-row items-center mb-6">
        <img src={Logoimg} alt="TrackMate Logo" className="h-20 w-20 object-contain mb-2" />
        <h2 className="text-2xl font-bold text-white">TrackMate</h2>
      </div>
            <h3 className="text-lg font-bold text-white mb-4">Sign up as:</h3>
            <button
        className="w-full px-4 py-3 mb-3 bg-[#495057] text-white rounded-md"
              onClick={() => navigate("/manager-signup")}
            >
              Manager
            </button>
            <button
        className="w-full px-4 py-3 mb-3 bg-[#495057] text-white rounded-md"
              onClick={() => navigate("/employee-signup")}
            >
              Employee
            </button>
            <button
              className="mt-4 text-sm text-white hover:underline"
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
