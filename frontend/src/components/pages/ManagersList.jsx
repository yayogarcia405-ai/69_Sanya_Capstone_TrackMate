import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ManagersList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState({});

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please log in to view managers.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/managers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setManagers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching managers:', error);
        toast.error('Failed to load managers. Please try again.');
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);
  const copyToClipboard = (email) => {
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address.');
      return;
    }

    navigator.clipboard.writeText(email)
      .then(() => {
        console.log(`Copied ${email} to clipboard`);
        toast.success('Email copied to clipboard!');
        setCopied((prev) => ({ ...prev, [email]: true }));
        // Reset copied state after 2 seconds
        setTimeout(() => setCopied((prev) => ({ ...prev, [email]: false })), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy to clipboard:', err);
        toast.error('Failed to copy email. Please try again or check permissions.');
      });
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading managers...</div>;
  }

  return (
    <div className="min-h-screen bg-[#495057] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Managers List</h1>
        {managers.length === 0 ? (
          <p className="text-white">No managers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-[#6c757d] rounded-lg shadow-lg">
              <thead>
                <tr className="bg-[#343a40] text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager) => (
                  <tr key={manager._id} className="border-t border-[#495057] hover:bg-[#5a6268]">
                    <td className="p-3 text-white">{manager.username || 'N/A'}</td>
                    <td className="p-3 text-white">{manager.email}</td>
                    <td className="p-3">
                    <button
                              onClick={() => copyToClipboard(manager.email)}
                              className={`${
                                copied[manager.email] ? 'text-green-500' : 'text-white'
                              } hover:underline focus:outline-none`}
                            >
                              {copied[manager.email] ? 'Copied!' : 'Copy Email'}
                            </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagersList;
