import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logoimg from "../images/trackmate.png";
import Bgimg from "../images/background2.jpeg"; // Adjust path to your actual background image

export default function EntryPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen bg-[#c2c0c0] flex flex-col relative"
      style={{
        backgroundImage: `url(${Bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        opacity: 80, // Increased for better visibility
        // filter: "blur(2px)", // Subtle blur to make content pop
      }}
    >
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-transparent z-0"></div>

      {/* Navbar */}
      <nav className="w-full flex  items-center px-8 py-5 bg-[#343A40]/50 backdrop-blur-md shadow-md h-20 relative z-10">
        <div className="flex items-center flex-1 justify-center absolute left-0 right-0">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white drop-shadow-md">TrackMate</h1>
        </div>
        <div className="flex gap-4 ml-auto">
          <button
            className="px-6 py-2 bg-white/30 hover:bg-[#5c636a] transition-all duration-300  text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
            onClick={() => setShowLoginModal(true)}
          >
            LOGIN
          </button>
          <button
            className="px-6 py-2 bg-white/30 hover:bg-[#5c636a] transition-all duration-300  text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
            onClick={() => setShowSignupModal(true)}
          >
            SIGNUP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 animate-fadeIn relative z-10">
        <div >
          <h2 className="text-6xl font-medium text-white drop-shadow-xl mb-5">
            Welcome to TrackMate!
          </h2>
        </div>

        <p className="text-2xl text-white drop-shadow-xl max-w-3xl font-small">
          Effortless Workforce Tracking for Maximum Productivity.
        </p>
      </div>

      {/* Feature Boxes */}
      <div className="flex flex-wrap color- to-black justify-center gap-10 mt-14 px-6">
        {[
          {
            title: "Our Mission",
            description: "Revolutionizing workforce management with real-time tracking, ensuring efficiency and transparency.",
            
          },
          {
            title: "What We Do",
            description: "Live workforce tracking, automated attendance, and task scheduling to boost productivity.",
            
          },
          {
            title: "Why Choose Us?",
            description: "Real-time GPS & facial recognition for seamless attendance tracking and efficiency.",
            
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white/22 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 text-white p-8 rounded-2xl shadow-xl w-80 text-center cursor-pointer transform hover:-translate-y-2"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="font-bold text-2xl mb-4 text-white drop-shadow-md">{feature.title}</h3>
            <p className="text-base text-gray-100">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50 transition-opacity duration-300">
          <div className="bg-[#343A40] p-8 rounded-2xl shadow-2xl w-96 flex flex-col items-center transform transition-transform duration-300 scale-100 animate-scaleIn">
            <img src={Logoimg} alt="TrackMate Logo" className="h-20 w-20 object-contain mb-4" />
            <h2 className="text-2xl font-bold text-white mb-6">Login as:</h2>
            <button
              className="w-full mb-3 px-4 py-3 bg-[#495057] hover:bg-[#5c636a] transition-all duration-300 rounded-md text-white font-semibold shadow-md hover:shadow-lg"
              onClick={() => navigate("/manager-login")}
            >
              Manager
            </button>
            <button
              className="w-full mb-6 px-4 py-3 bg-[#495057] hover:bg-[#5c636a] transition-all duration-300 rounded-md text-white font-semibold shadow-md hover:shadow-lg"
              onClick={() => navigate("/employee-login")}
            >
              Employee
            </button>
            <button
              className="text-sm text-gray-300 hover:underline"
              onClick={() => setShowLoginModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50 transition-opacity duration-300">
          <div className="bg-[#343A40] p-8 rounded-2xl shadow-2xl w-96 flex flex-col items-center transform transition-transform duration-300 scale-100 animate-scaleIn">
            <img src={Logoimg} alt="TrackMate Logo" className="h-20 w-20 object-contain mb-4" />
            <h2 className="text-2xl font-bold text-white mb-6">Sign up as:</h2>
            <button
              className="w-full mb-3 px-4 py-3 bg-[#495057] hover:bg-[#5c636a] transition-all duration-300 rounded-md text-white font-semibold shadow-md hover:shadow-lg"
              onClick={() => navigate("/manager-signup")}
            >
              Manager
            </button>
            <button
              className="w-full mb-6 px-4 py-3 bg-[#495057] hover:bg-[#5c636a] transition-all duration-300 rounded-md text-white font-semibold shadow-md hover:shadow-lg"
              onClick={() => navigate("/employee-signup")}
            >
              Employee
            </button>
            <button
              className="text-sm text-gray-300 hover:underline"
              onClick={() => setShowSignupModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}