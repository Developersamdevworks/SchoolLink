import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHome, FaTasks, FaBell, FaChartBar, FaUsers, FaComment, FaSignOutAlt } from 'react-icons/fa'; // Icons for navbar
import '../styles/TeacherStudents.css';

const TeacherStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/students', { headers: { 'x-auth-token': token } });
        setStudents(res.data);
      } catch (error) {
        alert('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div
      className="teacher-students"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar Section */}
      <motion.nav
        className="teacher-students-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Teacher Panel</h2>
        <div className="teacher-students-nav-links">
          <Link to="/teacher-panel"><FaHome className="teacher-students-nav-icon" /> Home</Link>
          <Link to="/teacher-assignments"><FaTasks className="teacher-students-nav-icon" /> Assignments</Link>
          <Link to="/teacher-notifications"><FaBell className="teacher-students-nav-icon" /> Notifications</Link>
          <Link to="/teacher-results"><FaChartBar className="teacher-students-nav-icon" /> Results</Link>
          <Link to="/teacher-students"><FaUsers className="teacher-students-nav-icon" /> Students</Link>
          <Link to="/teacher-feedback"><FaComment className="teacher-students-nav-icon" /> Feedback</Link>
          <motion.button
            onClick={handleLogout}
            className="teacher-students-logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="teacher-students-logout-icon" /> Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Students Management Section */}
      <motion.div
        className="teacher-students-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2>Manage Students</h2>
        <motion.div
          className="teacher-students-table-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <table className="teacher-students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                >
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherStudents;