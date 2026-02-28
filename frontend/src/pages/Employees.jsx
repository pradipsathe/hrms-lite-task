import { useEffect, useState } from "react";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const fetchEmployees = () => {
    API.get("employees/")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("employees/", form)
      .then(() => {
        fetchEmployees();
        setForm({
          employee_id: "",
          full_name: "",
          email: "",
          department: ""
        });
      })
      .catch(() => {
        alert("Error adding employee");
      });
  };

  const handleDelete = (id) => {
    API.delete(`employees/${id}/`)
      .then(() => fetchEmployees())
      .catch(() => alert("Error deleting employee"));
  };

  return (
    <div>
      <h1>Employee Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={e =>
            setForm({ ...form, employee_id: e.target.value })
          }
          required
        />

        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={e =>
            setForm({ ...form, full_name: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={e =>
            setForm({ ...form, department: e.target.value })
          }
          required
        />

        <button type="submit">Add Employee</button>
      </form>

      <hr />

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        employees.map(emp => (
          <div key={emp.id} className="employee-card">
            <strong>{emp.full_name}</strong> - {emp.department}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(emp.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Employees;