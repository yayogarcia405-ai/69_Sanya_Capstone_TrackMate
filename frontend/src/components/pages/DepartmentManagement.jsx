import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaTrash} from "react-icons/fa";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_META_URI}/api/departments`);
        setDepartments(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Add department
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!newDepartment.trim()) {
      toast.error('Department name is required', { position: 'top-center', autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_META_URI}/api/departments`, { name: newDepartment });
      setDepartments([...departments, response.data]);
      setNewDepartment('');
      toast.success('Department added successfully', { position: 'top-center', autoClose: 3000 });
    } catch (err) {
      console.error('Error adding department:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add department';
      toast.error(errorMessage, { position: 'top-center', autoClose: 3000 });
    }
  };

  // Remove department
  const handleRemoveDepartment = async (departmentId) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_META_URI}/api/departments/${departmentId}`);
      setDepartments(departments.filter((dept) => dept._id !== departmentId));
      toast.success('Department deleted successfully', { position: 'top-center', autoClose: 3000 });
    } catch (err) {
      console.error('Error deleting department:', err);
      toast.error('Failed to delete department', { position: 'top-center', autoClose: 3000 });
    }
  };

  if (loading) return <div className="text-black text-center">Loading departments...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">Departments</h2>
      {/* Add Department Form */}
      <form onSubmit={handleAddDepartment} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Enter department name"
            className="w-full max-w-md px-4 py-2 border rounded shadow bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#495057] text-white rounded hover:bg-[#343A40]"
          >
            Add Department
          </button>
        </div>
      </form>

      {/* Department List */}
      {departments.length === 0 ? (
        <p className="text-gray-500">No departments available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept._id}
              className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
            >
              <span className="text-black font-semibold">{dept.name}</span>
              <button
                onClick={() => handleRemoveDepartment(dept._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash/>
              </button>
            </div>
          ))}
        </div>
      )}

      <ToastContainer
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
      <style>
        {`
          .custom-toast {
            background-color: #495057;
            color: #ffffff;
            border-radius: 8px;
            padding: 12px;
            margin-top: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            font-family: inherit;
          }
          .custom-toast-body {
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
          }
          .Toastify__progress-bar {
            background-color: #83868a;
          }
          .Toastify__close-button {
            color: #ffffff;
            opacity: 0.7;
          }
          .Toastify__close-button:hover {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default DepartmentManagement;