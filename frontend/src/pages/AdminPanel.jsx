import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUsers, FaChalkboardTeacher, FaUserTie, FaSignOutAlt, FaBell } from "react-icons/fa";
import Clock from "../components/Clock";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, parents: 0 });
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const [statsRes, notifRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/stats", {
          headers: { "x-auth-token": token },
        }),
        axios.get("http://localhost:5000/api/admin/notifications", {
          headers: { "x-auth-token": token },
        }),
      ]);
      setStats(statsRes.data);
      setNotifications(notifRes.data);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav className="admin-nav">
          <Link to="/admin-panel" className="nav-link">Home</Link>
          <Link to="/admin-teacher-management" className="nav-link">Teacher Management</Link>
          <Link to="/admin-student-parent-management" className="nav-link">Stu-Par Management</Link>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </header>

      <main className="admin-content">
        <section className="stats-section">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>Total Students</h3>
              <p>{stats.students}</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaChalkboardTeacher className="stat-icon" />
            <div className="stat-content">
              <h3>Total Teachers</h3>
              <p>{stats.teachers}</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FaUserTie className="stat-icon" />
            <div className="stat-content">
              <h3>Total Parents</h3>
              <p>{stats.parents}</p>
            </div>
          </motion.div>
        </section>

        <section className="time-section">
          <Clock />
        </section>

        <section className="notifications-section">
          <h2>
            <FaBell /> Notifications
          </h2>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <motion.div
                  key={index}
                  className="notification-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <p>{notif.message} - {notif.teacher?.name || "Teacher"}</p>
                </motion.div>
              ))
            ) : (
              <p className="no-notifications">No notifications available</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;