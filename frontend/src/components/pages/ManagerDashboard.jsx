import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import axios from "axios";
import Logoimg from "../images/trackmate.png";
import React from "react"; 
import ManagersList from "./ManagersList";
import DepartmentManagement from "./DepartmentManagement";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("task-assignment");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const employeeId=localStorage.getItem("userId");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log(import.meta.env.VITE_META_URI)
        const res = await axios.get(`${import.meta.env.VITE_META_URI}/api/auth/employees`);
        setEmployees(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees. Please try again.");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#c2c0c0]">
      {/* Navbar */}
      <nav className="w-full flex flex-col items-center px-8 py-5 bg-[#343A40] shadow-md h-20 relative">
        <div className="flex items-center space-x-4">
          <img src={Logoimg} alt="TrackMate Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold text-white">TrackMate</h1>
        </div>
        <button
          className="absolute right-8 top-5 text-white"
          onClick={() => navigate(`/manager-settings/${employeeId}`)}
          aria-label="Manager Settings"
        >
          <Settings size={28} />
        </button>
      </nav>

      {/* Main Section */}
      <div className="w-full flex justify-center items-center mt-6 space-x-2 text-lg font-semibold">
        <button
          className={`cursor-pointer px-4 py-2 ${
            activeTab === "task-assignment" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("task-assignment")}
          aria-selected={activeTab === "task-assignment"}
          role="tab"
        >
          Task Assignment
        </button>
        <span className="text-gray-400">|</span>
        <button
          className={`cursor-pointer px-4 py-2 ${
            activeTab === "department-assignment" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("department-assignment")}
          aria-selected={activeTab === "department-assignment"}
          role="tab"
        >
          Department Assignment
        </button>
        <span className="text-gray-400">|</span>
        <button
          className={`cursor-pointer px-4 py-2 ${
            activeTab === "connect" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("connect")}
          aria-selected={activeTab === "connect"}
          role="tab"
        >
          Connect
        </button>

        <span className="text-gray-400">|</span>
        <button
          className={`cursor-pointer px-4 py-2 ${
            activeTab === "departments" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("departments")}
          aria-selected={activeTab === "departments"}
          role="tab"
        >
          Departments
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {/* Render Active Tab */}
      <div className="mt-8 px-10">
      {(() => {
          if (activeTab === "task-assignment") {
            return <TaskAssignment employees={employees} />;
          } else if (activeTab === "department-assignment") {
            return <DepartmentAssignment employees={employees} setEmployees={setEmployees} />;
          } else if (activeTab==="departments"){
            return <DepartmentManagement/>
          }else if (activeTab === "connect") {
            return <ManagersList />;
          }
          return null;
        })()}
      </div>
    </div>
  );
}

const DepartmentAssignment = React.memo(({ employees, setEmployees }) => {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      emp.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, employees]);

  const handleDepartmentChange = async (_id, department) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_META_URI}/api/auth/employees/${_id}/department`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department }),
      });

      if (!res.ok) throw new Error("Failed to update department");
      const updatedEmp = await res.json();

      if (!updatedEmp._id || !updatedEmp.username) {
        throw new Error("Invalid employee data from API");
      }

      setEmployees((prev) =>
        prev.map((emp) => (emp._id === _id ? updatedEmp : emp))
      );
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update department.");
    }
  };
  if (loading) return <div className="text-black text-center">Loading departments...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">Department Assignment</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employee by name"
        className="w-full max-w-md px-4 py-2 mb-6 border rounded shadow bg-white"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <div
            key={`dept-${emp._id}`}
            className="bg-white rounded-xl p-4 shadow flex flex-col items-center space-y-3"
          >
            {emp.document?.path && (
              emp.document.path.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img
                  src={`${import.meta.env.VITE_META_URI}${emp.document.path}`}
                  alt={`${emp.username}'s document`}
                  className="h-14 w-14 rounded-full object-cover border-2 border-gray-300"
                  onError={(e) => {
                    console.log("Document image failed, using default:", emp.document.path);
                    e.target.onerror = null;
                    e.target.src = "/default-document.png"; // Ensure this file exists in public/
                  }}
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm">Doc</span>
                </div>
              )
            )}

        
            <div className="text-center">
              <p className="font-semibold text-lg">{emp.username}</p>
              <select
                value={typeof emp.department === 'object' ? emp.department._id : emp.department || ""}
                onChange={(e) => handleDepartmentChange(emp._id, e.target.value)}
                className="mt-2 border px-2 py-1 rounded"
              >
                <option value="">No Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const TaskAssignment = React.memo(({ employees }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setLoading(false); // Set loading to false when done
      }
    };

    fetchDepartments();
  }, []);

  const filteredEmployees = useMemo(() => {
    console.log('Filtering employees:', employees); // Debug log
    return selectedDept
      ? employees.filter((e) => e.department?._id === selectedDept)
      : employees;
  }, [selectedDept, employees]);

  const handleAddTask = (_id) => navigate(`/manager/add-task/${_id}`);
  const handleViewSchedule = (_id) => navigate(`/manager/view-schedule/${_id}`);

  if (loading) return <div className="text-black text-center">Loading departments...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">Task Assignment</h2>
      <div className="flex gap-4 mb-6">
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="border px-4 py-2 rounded bg-white"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.length === 0 ? (
          <div className="text-gray-500 text-center col-span-full">No employees available</div>
        ) : (
          filteredEmployees.map((emp) => (
            <div
              key={`task-${emp._id}`}
              className="bg-white rounded-xl p-4 shadow flex flex-col items-center space-y-3"
            >
              {emp.document?.path && (
                emp.document.path.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img
                    src={`${import.meta.env.VITE_META_URI}${emp.document.path}`}
                    alt={`${emp.username}'s document`}
                    className="h-14 w-14 rounded-full object-cover border-2 border-gray-300"
                    onError={(e) => {
                      console.log("Document image failed, using default:", emp.document.path);
                      e.target.onerror = null;
                      e.target.src = "/default-document.png";
                    }}
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm">Doc</span>
                  </div>
                )
              )}

              <p className="font-semibold text-lg">{emp.username}</p>
              <p className="text-sm text-gray-600">{emp.department?.name || "No Department"}</p>

              <div className="flex gap-3">
                <button
                  className="px-4 py-1 bg-[#495057] text-white rounded"
                  onClick={() => handleAddTask(emp._id)}
                >
                  Add Task
                </button>
                <button
                  className="px-4 py-1 bg-[#6C757D] text-white rounded"
                  onClick={() => handleViewSchedule(emp._id)}
                >
                  View Schedule
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});