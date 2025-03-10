import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from "./components/pages/EntryPage";
import ManagerLogin from "./components/pages/ManagerLogin";
import EmployeeLogin from "./components/pages/EmployeeLogin";
import ManagerSignup from "./components/pages/ManagerSignup";
import EmployeeSignup from "./components/pages/EmployeeSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/manager-signup" element={<ManagerSignup />} />
        <Route path="/employee-signup" element={<EmployeeSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
