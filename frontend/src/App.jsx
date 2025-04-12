import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import EntryPage from "./components/pages/EntryPage";
import ManagerLogin from "./components/pages/ManagerLogin";
import EmployeeLogin from "./components/pages/EmployeeLogin";
import ManagerSignup from "./components/pages/ManagerSignup";
import EmployeeSignup from "./components/pages/EmployeeSignup";
import OtpLogin from "./components/pages/OtpLogin";
import OtpVerify from "./components/pages/OtpVerify";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import VerifyResetOtp from "./components/pages/VerifyResetOtp";
import ManagerDashboard from "./components/pages/ManagerDashboard";
import AddTask from "./components/pages/AddTask";
import ViewSchedule from "./components/pages/ViewSchedule";
import ViewLogs from "./components/pages/ViewLogs";
import ManagerSettings from "./components/pages/ManagerSettings";
import ManagerProfileSettings from "./components/pages/ManagerProfile";
import HelpSupport from "./components/pages/HelpSupport";
import FAQ from "./components/pages/FAQ";
import EmployeeDashboard from "./components/pages/EmployeeDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/manager-signup" element={<ManagerSignup />} />
        <Route path="/employee-signup" element={<EmployeeSignup />} />
        <Route path="/otp-login" element={<OtpLogin />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard/>}/>
        <Route path="/manager/add-task/:employeeId" element={<AddTask/>}/>
        <Route path="/manager/view-schedule/:employeeId" element={<ViewSchedule/>}/>
        <Route path="/view-logs" element={<ViewLogs/>}/>
        <Route path="/manager-settings" element={<ManagerSettings/>}/>
        <Route path="/manager-profile" element={<ManagerProfileSettings/>}/>
        <Route path="/help-support" element={<HelpSupport/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
