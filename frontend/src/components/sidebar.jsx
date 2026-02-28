import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">HRMS Lite</h2>

      <nav className="nav-links">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/employees"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Employees
        </NavLink>

        <NavLink 
          to="/attendance"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Attendance
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;