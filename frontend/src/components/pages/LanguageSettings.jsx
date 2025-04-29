import React from 'react';
import Logoimg from "../images/trackmate.png";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LanguageSettings = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-[#c2c0c0] flex flex-col">
      {/* Navbar */}
       {/* Navbar */}
        <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
                    <FiArrowLeft
                    className="text-white cursor-pointer absolute left-6"
                    size={25}
                    onClick={() => navigate(-1)}
                  />
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
      </nav>
      {/* Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-[#6C757D] p-10 rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl text-white font-semibold mb-4">Language Settings</h1>
          <p className="text-white text-lg">Feature Coming Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
