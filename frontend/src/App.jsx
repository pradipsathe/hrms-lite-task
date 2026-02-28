import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;