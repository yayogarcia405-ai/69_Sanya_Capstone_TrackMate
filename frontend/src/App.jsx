import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import EntryPage from "./components/pages/EntryPage";
import ManagerLogin from "./components/pages/ManagerLogin";
import EmployeeLogin from "./components/pages/EmployeeLogin";
import ManagerSignup from "./components/pages/ManagerSignup";
import EmployeeSignup from "./components/pages/EmployeeSignup";
import OtpLoginE from "./components/pages/OtpLoginE";
import OtpLoginM from "./components/pages/OtpLoginM";
import OtpVerifyM from "./components/pages/OtpVerifyM";
import OtpVerifyE from "./components/pages/OtpVerifyE";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import VerifyResetOtp from "./components/pages/VerifyResetOtp";
import ManagerDashboard from "./components/pages/ManagerDashboard";
import AddTask from "./components/pages/AddTask";
import ViewSchedule from "./components/pages/ViewSchedule";
import ViewLogs from "./components/pages/ViewLogs";
import ManagerSettings from "./components/pages/ManagerSettings";
import HelpSupport from "./components/pages/HelpSupport";
import FAQ from "./components/pages/FAQ";
import EmployeeDashboard from "./components/pages/EmployeeDashboard";
import ViewTask from "./components/pages/ViewTask";
import EmployeeSettings from "./components/pages/EmployeeSettings";
import LanguageSettings from "./components/pages/LanguageSettings";
import LogoutPage from "./components/pages/ManagerLogout";
import ELogoutPage from "./components/pages/EmployeeLogout";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/manager-signup" element={<ManagerSignup />} />
        <Route path="/employee-signup" element={<EmployeeSignup />} />
        <Route path="/otp-login-e" element={<OtpLoginE/>}/>
        <Route path="/otp-login-m" element={<OtpLoginM/>}/>
        <Route path="/verify-otp-e" element={<OtpVerifyE/>}/>
        <Route path="/verify-otp-m" element={<OtpVerifyM/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/manager-dashboard/:employeeId" element={<ManagerDashboard/>}/>
        <Route path="/manager/add-task/:employeeId" element={<AddTask/>}/>
        <Route path="/manager/view-schedule/:employeeId" element={<ViewSchedule/>}/>
        <Route path="/view-logs/:taskId" element={<ViewLogs/>}/>
        <Route path="/manager-settings/:employeeId" element={<ManagerSettings/>}/>
        <Route path="/help-support" element={<HelpSupport/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/employee-dashboard/:employeeId" element={ <EmployeeDashboard />}/>
        <Route path="/view-task/:taskId" element={<ViewTask/>}/>
        <Route path="/employee-settings/:employeeId" element={<EmployeeSettings/>}/>
        <Route path="/language-settings" element={<LanguageSettings/>}/>
        <Route path="/manager-logout/:employeeId" element={<LogoutPage/>}/>
        <Route path="/employee-logout/:employeeId" element={<ELogoutPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
