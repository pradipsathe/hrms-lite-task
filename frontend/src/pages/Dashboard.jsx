import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    API.get("employees/")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));

    API.get("attendance/")
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));
  }, []);

  const presentCount = attendance.filter(
    a => a.status === "Present"
  ).length;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div className="card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="card">
          <h3>Total Present</h3>
          <p>{presentCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;