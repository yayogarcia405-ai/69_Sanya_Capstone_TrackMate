import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagersList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

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
                      <a
                        href={`mailto:${manager.email}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Contact
                      </a>
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
