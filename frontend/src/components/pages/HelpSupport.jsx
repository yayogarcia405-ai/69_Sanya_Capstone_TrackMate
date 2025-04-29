// HelpSupport.jsx
import React from "react";
import Logoimg from "../images/trackmate.png"; // Update the path based on your project
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate=useNavigate();
  return (
    <div className="w-full min-h-screen bg-[#c2c0c0] flex flex-col">
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

      {/* Content Box */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#343A40]">Help & Support</h2>

          <p className="mb-4 text-gray-700">
            Need help with TrackMate? We’re here for you! Whether you're facing technical issues,
            have a feature request, or need general assistance, feel free to reach out.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#495057]">📧 Email Support</h3>
              <p className="text-gray-700">support@trackmate.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-[#495057]">📞 Call Us</h3>
              <p className="text-gray-700">‪+91 98765 43210‬ (Mon - Fri, 9AM - 6PM)</p>
            </div>


            <div>
              <h3 className="font-semibold text-[#495057]">📚 FAQs</h3>
              <p className="text-gray-700">
                Check out our <a href="/faq" className="text-black-600 underline">Frequently Asked Questions</a> to find quick answers.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Thank you for using TrackMate! ❤
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
