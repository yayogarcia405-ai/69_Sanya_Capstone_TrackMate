// FAQ.jsx
import React from "react";
import Logoimg from "../images/trackmate.png"; // Make sure to update the path as per your project
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate=useNavigate();
  const faqs = [
    {
      question: "What is TrackMate?",
      answer: "TrackMate is a task and department tracking tool designed to streamline employee management for organizations.",
    },
    {
      question: "How do I assign a department to an employee?",
      answer: "Managers can navigate to the 'Department Assignment' tab on the dashboard and use the dropdown next to each employee.",
    },
    {
      question: "Can employees view their tasks?",
      answer: "Yes, employees can log in and view their assigned tasks and schedules from their dashboard.",
    },
    {
      question: "I forgot my password. What should I do?",
      answer: "Click on 'Forgot Password' on the login page and follow the steps to reset your password via email OTP.",
    },
    {
      question: "How do I contact support?",
      answer: "You can visit the Help & Support page or email us at support@trackmate.com.",
    },
  ];

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

      {/* FAQ Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl mt-10 mb-10">
          <h2 className="text-2xl font-semibold text-center text-[#343A40] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-[#495057]">{faq.question}</h3>
                <p className="text-gray-700 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Still have questions? <a href="/help-support" className="text-black-600 underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
