import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHome, FaTasks, FaBell, FaChartBar, FaUsers, FaComment, FaSignOutAlt, FaPlus, FaTrash } from 'react-icons/fa';
import '../styles/TeacherResults.css';

const TeacherResults = () => {
  const [results, setResults] = useState([]);
  const [studentEmail, setStudentEmail] = useState(''); // Changed from student to studentEmail
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/results', {
          headers: { 'x-auth-token': token },
        });
        setResults(res.data);
      } catch (error) {
        alert('Failed to fetch results');
        console.error('Fetch results error:', error.message);
      }
    };
    fetchResults();
  }, []);

  const addResult = async () => {
    if (!studentEmail || !subject || !marks) return alert('All fields are required!');
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/teacher/results',
        { studentEmail, subject, marks }, // Send studentEmail instead of student ID
        { headers: { 'x-auth-token': token } }
      );
      setResults([...results, res.data]);
      setStudentEmail('');
      setSubject('');
      setMarks('');
    } catch (error) {
      alert('Failed to add result');
      console.error('Add result error:', error.message);
    }
  };

  const deleteResult = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/teacher/results/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setResults(results.filter((r) => r._id !== id));
    } catch (error) {
      alert('Failed to delete result');
      console.error('Delete result error:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div
      className="teacher-results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar Section */}
      <motion.nav
        className="teacher-results-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Teacher Panel</h2>
        <div className="teacher-results-nav-links">
          <Link to="/teacher-panel">
            <FaHome className="teacher-results-nav-icon" /> Home
          </Link>
          <Link to="/teacher-assignments">
            <FaTasks className="teacher-results-nav-icon" /> Assignments
          </Link>
          <Link to="/teacher-notifications">
            <FaBell className="teacher-results-nav-icon" /> Notifications
          </Link>
          <Link to="/teacher-results">
            <FaChartBar className="teacher-results-nav-icon" /> Results
          </Link>
          <Link to="/teacher-students">
            <FaUsers className="teacher-results-nav-icon" /> Students
          </Link>
          <Link to="/teacher-feedback">
            <FaComment className="teacher-results-nav-icon" /> Feedback
          </Link>
          <motion.button
            onClick={handleLogout}
            className="teacher-results-logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="teacher-results-logout-icon" /> Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Results Management Section */}
      <motion.div
        className="teacher-results-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2>Manage Results</h2>
        <motion.div
          className="teacher-result-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.input
            type="email" // Changed to email type for better UX
            placeholder="Student Email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
            transition={{ duration: 0.3 }}
          />
          <motion.input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
            transition={{ duration: 0.3 }}
          />
          <motion.input
            type="number"
            placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            onClick={addResult}
            className="teacher-result-add-btn"
            whileHover={{ scale: 1.05, backgroundColor: '#45a049' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="teacher-result-add-icon" /> Add Result
          </motion.button>
        </motion.div>

        {/* Results List */}
        <motion.div
          className="teacher-results-list"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {results.map((result, index) => (
            <motion.div
              key={result._id}
              className="teacher-result-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3>{result.student.name}</h3>
              <p>Subject: {result.subject}</p>
              <span>Marks: {result.marks}</span>
              <motion.button
                onClick={() => deleteResult(result._id)}
                className="teacher-result-delete-btn"
                whileHover={{ scale: 1.05, backgroundColor: '#e63939' }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTrash className="teacher-result-delete-icon" /> Delete
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherResults;