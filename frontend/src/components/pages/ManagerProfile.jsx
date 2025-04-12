import React, { useState } from "react";
import Logoimg from "../images/trackmate.png"; // Adjust the path for your logo image

const ManagerProfileSettings = () => {
  const [name, setName] = useState(""); // State for the name input
  const [photo, setPhoto] = useState(null); // State for the photo upload
  const [message, setMessage] = useState(""); // State for success/error message

  // Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Set the photo to the state as a data URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit function to save data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    const fileInput = document.getElementById("photo-upload");
    if (fileInput.files[0]) {
      formData.append("photo", fileInput.files[0]);
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        setMessage("Profile updated successfully!");
        // Update state with the saved data from the backend
        setName(result.profile.name); // Reflect the saved name
        setPhoto(result.profile.photo ? `http://localhost:5000${result.profile.photo}` : null); // Use the saved photo URL
        // Clear the file input to prevent re-uploading the same file
        if (fileInput) fileInput.value = "";
      } else {
        const error = await response.json();
        setMessage(`Failed to update profile: ${error.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#c2c0c0] flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
      </nav>

      {/* Profile Settings Page */}
      <div className="flex items-center justify-center flex-1">
        <div className="max-w-md w-280 p-6 bg-[#495057] shadow-lg rounded-lg mt-8">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Manager Profile Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#f3f2f2]">Change Name</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full p-2 mt-2 border text-[#f3f2f2] border-[#edf0f1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a5a8ac]"
                placeholder="Enter name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#f3ecec]">Upload Photo</label>
              <div className="flex justify-center items-center mt-2">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#6C757D] flex justify-center items-center bg-[#6C757D]">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-center text-sm">No Photo</span>
                  )}
                </div>
              </div>
              <div className="text-center mt-2">
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-[#f7eeee] hover:underline"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#343A40] text-white rounded-md hover:bg-[#adb0b3]"
            >
              Save Changes
            </button>
            {message && (
              <p className="text-center text-[#f3f2f2] mt-4">{message}</p>
            )} {/* Styled message to match your theme */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfileSettings;
