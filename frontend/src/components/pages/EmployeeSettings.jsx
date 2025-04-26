import { useNavigate } from "react-router-dom";
import Logoimg from "../images/trackmate.png";
import { FaUserCog, FaLanguage, FaQuestionCircle, FaHandsHelping } from "react-icons/fa";

export default function EmployeeSettings() {
  const navigate = useNavigate();

  const settingsOptions = [
    { label: "Profile Settings", route: "/employee-profile", icon: <FaUserCog className="text-xl text-gray-700" /> },
    { label: "Language Settings", route: "/language-settings", icon: <FaLanguage className="text-xl text-gray-700" /> },
    { label: "Help & Support", route: "/help-support", icon: <FaHandsHelping className="text-xl text-gray-700" /> },
    { label: "FAQs", route: "/faq", icon: <FaQuestionCircle className="text-xl text-gray-700" /> },
  ];

  return (
    <div className="w-full min-h-screen bg-[#c2c0c0]">
      {/* Navbar */}
      <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
      </nav>

      {/* Settings Section */}
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Settings</h2>
        <div className="w-full max-w-md space-y-5">
          {settingsOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => navigate(option.route)}
              className="w-full py-4 px-6 bg-white text-gray-800 text-lg font-medium rounded-xl shadow-md hover:bg-gray-100 transition-all duration-200 flex items-center space-x-4"
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
