import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaHome, FaTasks, FaBell, FaChartBar, FaUsers, FaComment, FaSignOutAlt, FaPlus, FaTrash } from 'react-icons/fa'; // Icons for navbar, form, and cards
import '../styles/TeacherAssignments.css';

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/assignments', { headers: { 'x-auth-token': token } });
        setAssignments(res.data);
      } catch (error) {
        alert('Failed to fetch assignments');
      }
    };
    fetchAssignments();
  }, []);

  const addAssignment = async () => {
    if (!title || !description || !dueDate) return alert('All fields are required!');
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/teacher/assignments', { title, description, dueDate }, { headers: { 'x-auth-token': token } });
      setAssignments([...assignments, res.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      alert('Failed to add assignment');
    }
  };

  const deleteAssignment = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/teacher/assignments/${id}`, { headers: { 'x-auth-token': token } });
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (error) {
      alert('Failed to delete assignment');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div
      className="teacher-assignments"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar Section */}
      <motion.nav
        className="teacher-assignments-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Teacher Panel</h2>
        <div className="teacher-assignments-nav-links">
          <Link to="/teacher-panel"><FaHome className="teacher-assignments-nav-icon" /> Home</Link>
          <Link to="/teacher-assignments"><FaTasks className="teacher-assignments-nav-icon" /> Assignments</Link>
          <Link to="/teacher-notifications"><FaBell className="teacher-assignments-nav-icon" /> Notifications</Link>
          <Link to="/teacher-results"><FaChartBar className="teacher-assignments-nav-icon" /> Results</Link>
          <Link to="/teacher-students"><FaUsers className="teacher-assignments-nav-icon" /> Students</Link>
          <Link to="/teacher-feedback"><FaComment className="teacher-assignments-nav-icon" /> Feedback</Link>
          <motion.button
            onClick={handleLogout}
            className="teacher-assignments-logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="teacher-assignments-logout-icon" /> Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Assignments Management Section */}
      <motion.div
        className="teacher-assignments-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2>Manage Assignments</h2>
        <motion.div
          className="teacher-assignment-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: "#00d4ff" }}
            transition={{ duration: 0.3 }}
          />
          <motion.input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: "#00d4ff" }}
            transition={{ duration: 0.3 }}
          />
          <motion.input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: "#00d4ff" }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            onClick={addAssignment}
            className="teacher-assignment-add-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#45a049" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="teacher-assignment-add-icon" /> Add Assignment
          </motion.button>
        </motion.div>

        {/* Assignment List */}
        <motion.div
          className="teacher-assignment-list"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment._id}
              className="teacher-assignment-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              <motion.button
                onClick={() => deleteAssignment(assignment._id)}
                className="teacher-assignment-delete-btn"
                whileHover={{ scale: 1.05, backgroundColor: "#e63939" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTrash className="teacher-assignment-delete-icon" /> Delete
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherAssignments;