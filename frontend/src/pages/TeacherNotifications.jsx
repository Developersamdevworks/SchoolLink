import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHome, FaTasks, FaBell, FaChartBar, FaUsers, FaComment, FaSignOutAlt, FaPaperPlane, FaTrash } from 'react-icons/fa'; // Icons for navbar, form, and cards
import '../styles/TeacherNotifications.css';

const TeacherNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/notifications', { headers: { 'x-auth-token': token } });
        setNotifications(res.data);
      } catch (error) {
        alert('Failed to fetch notifications');
      }
    };
    fetchNotifications();
  }, []);

  const sendNotification = async () => {
    if (!message) return alert('Enter a message!');
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/teacher/notifications', { message }, { headers: { 'x-auth-token': token } });
      setNotifications([...notifications, res.data]);
      setMessage('');
    } catch (error) {
      alert('Failed to send notification');
    }
  };

  const deleteNotification = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/teacher/notifications/${id}`, { headers: { 'x-auth-token': token } });
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (error) {
      alert('Failed to delete notification');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div
      className="teacher-notifications"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar Section */}
      <motion.nav
        className="teacher-notifications-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Teacher Panel</h2>
        <div className="teacher-notifications-nav-links">
          <Link to="/teacher-panel"><FaHome className="teacher-notifications-nav-icon" /> Home</Link>
          <Link to="/teacher-assignments"><FaTasks className="teacher-notifications-nav-icon" /> Assignments</Link>
          <Link to="/teacher-notifications"><FaBell className="teacher-notifications-nav-icon" /> Notifications</Link>
          <Link to="/teacher-results"><FaChartBar className="teacher-notifications-nav-icon" /> Results</Link>
          <Link to="/teacher-students"><FaUsers className="teacher-notifications-nav-icon" /> Students</Link>
          <Link to="/teacher-feedback"><FaComment className="teacher-notifications-nav-icon" /> Feedback</Link>
          <motion.button
            onClick={handleLogout}
            className="teacher-notifications-logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="teacher-notifications-logout-icon" /> Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Notifications Management Section */}
      <motion.div
        className="teacher-notifications-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2>Manage Notifications</h2>
        <motion.div
          className="teacher-notification-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: "#00d4ff" }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            onClick={sendNotification}
            className="teacher-notification-send-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#45a049" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane className="teacher-notification-send-icon" /> Send
          </motion.button>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          className="teacher-notifications-list"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {notifications.map((notif, index) => (
            <motion.div
              key={notif._id}
              className="teacher-notification-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p>{notif.message}</p>
              <span>{new Date(notif.createdAt).toLocaleDateString()}</span>
              <motion.button
                onClick={() => deleteNotification(notif._id)}
                className="teacher-notification-delete-btn"
                whileHover={{ scale: 1.05, backgroundColor: "#e63939" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTrash className="teacher-notification-delete-icon" /> Delete
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherNotifications;