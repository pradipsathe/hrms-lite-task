import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present"
  });

  const fetchEmployees = () => {
    API.get("employees/")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  const fetchAttendance = () => {
    API.get("attendance/")
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("attendance/", form)
      .then(() => {
        fetchAttendance();
        setForm({
          employee: "",
          date: "",
          status: "Present"
        });
      })
      .catch(() => alert("Error marking attendance"));
  };

  return (
    <div>
      <h1>Attendance Management</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={form.employee}
          onChange={e =>
            setForm({ ...form, employee: e.target.value })
          }
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={e =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        <select
          value={form.status}
          onChange={e =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Mark Attendance</button>
      </form>

      <hr />

      {attendance.length === 0 ? (
        <p>No attendance records found</p>
      ) : (
        attendance.map(record => {
          const emp = employees.find(
            e => e.id === record.employee
          );

          return (
            <div key={record.id} className="employee-card">
              <strong>
                {emp ? emp.full_name : "Unknown"}
              </strong>{" "}
              | {record.date} | {record.status}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Attendance;