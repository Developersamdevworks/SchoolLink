import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Clock from '../components/Clock';
import { FaHome, FaTasks, FaBell, FaChartBar, FaUsers, FaComment, FaSignOutAlt } from 'react-icons/fa'; // Icons for navbar and cards
import '../styles/TeacherPanel.css';

const TeacherPanel = () => {
  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [assignRes, notifRes] = await Promise.all([
          axios.get('http://localhost:5000/api/teacher/assignments', { headers: { 'x-auth-token': token } }),
          axios.get('http://localhost:5000/api/teacher/notifications', { headers: { 'x-auth-token': token } })
        ]);
        setAssignments(assignRes.data);
        setNotifications(notifRes.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div className="teacher-loading">Loading...</div>;
  if (error) return <div className="teacher-error">Error: {error}</div>;

  return (
    <motion.div
      className="teacher-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar Section */}
      <motion.nav
        className="teacher-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Teacher Panel</h2>
        <div className="teacher-nav-links">
          <Link to="/teacher-panel"><FaHome className="teacher-nav-icon" /> Home</Link>
          <Link to="/teacher-assignments"><FaTasks className="teacher-nav-icon" /> Assignments</Link>
          <Link to="/teacher-notifications"><FaBell className="teacher-nav-icon" /> Notifications</Link>
          <Link to="/teacher-results"><FaChartBar className="teacher-nav-icon" /> Results</Link>
          <Link to="/teacher-students"><FaUsers className="teacher-nav-icon" /> Students</Link>
          <Link to="/teacher-feedback"><FaComment className="teacher-nav-icon" /> Feedback</Link>
          <motion.button
            onClick={handleLogout}
            className="teacher-logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="teacher-logout-icon" /> Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Dashboard Section */}
      <motion.div
        className="teacher-dashboard"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.div
          className="teacher-card teacher-assignment-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="teacher-card-header">
            <FaTasks className="teacher-card-icon" />
            <h3>Assignments</h3>
          </div>
          <p>{assignments.length} assigned</p>
        </motion.div>
        <motion.div
          className="teacher-card teacher-notification-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="teacher-card-header">
            <FaBell className="teacher-card-icon" />
            <h3>Notifications</h3>
          </div>
          {notifications.length > 0 ? (
            notifications.slice(0, 3).map((notif, index) => (
              <motion.p
                key={notif._id}
                className="teacher-notification-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                {notif.message}
              </motion.p>
            ))
          ) : (
            <p className="teacher-notification-item">No notifications available.</p>
          )}
        </motion.div>
        <motion.div
          className="teacher-card teacher-clock-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Clock />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherPanel;