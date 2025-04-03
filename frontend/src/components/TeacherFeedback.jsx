import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for logout
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHome, FaTasks, FaBell, FaChartBar, FaUsers, FaComment, FaSignOutAlt } from 'react-icons/fa'; // Icons for navbar
import '../styles/TeacherFeedback.css';

const TeacherFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Added for logout functionality

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/feedback', {
          headers: { 'x-auth-token': token }
        });
        setFeedbacks(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) return <div className="teacher-feedback-loading">Loading...</div>;

  return (
    <motion.div 
      className="teacher-feedback"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar Section */}
      <motion.nav
        className="teacher-feedback-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Teacher Panel</h2>
        <div className="teacher-feedback-nav-links">
          <Link to="/teacher-panel"><FaHome className="teacher-feedback-nav-icon" /> Home</Link>
          <Link to="/teacher-assignments"><FaTasks className="teacher-feedback-nav-icon" /> Assignments</Link>
          <Link to="/teacher-notifications"><FaBell className="teacher-feedback-nav-icon" /> Notifications</Link>
          <Link to="/teacher-results"><FaChartBar className="teacher-feedback-nav-icon" /> Results</Link>
          <Link to="/teacher-students"><FaUsers className="teacher-feedback-nav-icon" /> Students</Link>
          <Link to="/teacher-feedback"><FaComment className="teacher-feedback-nav-icon" /> Feedback</Link>
          <motion.button
            onClick={handleLogout}
            className="teacher-feedback-logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="teacher-feedback-logout-icon" /> Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Feedback Management Section */}
      <motion.div
        className="teacher-feedback-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2>Parent Feedback</h2>
        
        {feedbacks.length === 0 ? (
          <p className="teacher-feedback-no-data">No feedback received yet</p>
        ) : (
          <motion.div
            className="teacher-feedback-table-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <table className="teacher-feedback-table">
              <thead>
                <tr>
                  <th>Parent</th>
                  <th>Student</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback, index) => (
                  <motion.tr
                    key={feedback._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <td>{feedback.parent?.name || 'Unknown'}</td>
                    <td>{feedback.student?.name || 'Unknown'}</td>
                    <td>{feedback.message}</td>
                    <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TeacherFeedback;