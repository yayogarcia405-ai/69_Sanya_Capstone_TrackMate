import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const ELogoutPage = () => {
  const navigate = useNavigate();
  const id=localStorage.getItem("userId");

  const handleConfirmLogout = () => {
    // Clear token/localStorage or anything you use for auth
    localStorage.removeItem("token");

    // Redirect to employee login
    navigate("/");
  };

  const handleCancelLogout = () => {
    // Go back to previous page or dashboard
    navigate(-1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#c2c0c0] flex flex-col items-center justify-center text-black px-6">
      {/* Logout Box */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <FaSignOutAlt className="mx-auto text-5xl text-[#495057] mb-4" />
        <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
        <p className="mb-6">Are you sure you want to log out?</p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleConfirmLogout}
            className="bg-[#365B6D] hover:bg-[#2e4b5a] text-white font-semibold py-2 px-6 rounded-2xl transition duration-300"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-2xl transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ELogoutPage;
