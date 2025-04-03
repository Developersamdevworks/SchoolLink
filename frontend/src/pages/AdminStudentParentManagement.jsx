import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/AdminStudentParentManagement.css';

const AdminStudentParentManagement = () => {
  const [students, setStudents] = useState([]);
  const [studentEmail, setStudentEmail] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [linkSuccess, setLinkSuccess] = useState(false); // State to trigger success animation

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/student-parents', { headers: { 'x-auth-token': token } });
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const handleLink = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/admin/link-student-parent', { studentEmail, parentEmail }, { headers: { 'x-auth-token': token } });
      setLinkSuccess(true); // Trigger success animation
      setTimeout(() => setLinkSuccess(false), 2000); // Reset after 2 seconds
      setStudentEmail('');
      setParentEmail('');
      const res = await axios.get('http://localhost:5000/api/admin/student-parents', { headers: { 'x-auth-token': token } });
      setStudents(res.data);
    } catch (error) {
      alert(error.response?.data.msg || 'Linking failed');
    }
  };

  return (
    <motion.div
      className="admin-student-parent-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar Section */}
      <motion.nav
        className="admin-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Admin Panel</h2>
        <div className="nav-links">
          <Link to="/admin-panel">Home</Link>
          <Link to="/admin-teacher-management">Teacher Management</Link>
          <Link to="/admin-student-parent-management">Stu-Par Management</Link>
        </div>
      </motion.nav>

      {/* Content Section */}
      <motion.div
        className="content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3>Students and Their Parents</h3>
        <motion.form
          onSubmit={handleLink}
          className="link-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.input
            type="email"
            placeholder="Student Email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: "#00d4ff" }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            type="submit"
            className="link-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#45a049" }}
            whileTap={{ scale: 0.95 }}
            animate={linkSuccess ? { scale: [1, 1.2, 1], backgroundColor: ["#4caf50", "#00d4ff", "#4caf50"] } : {}}
            transition={{ duration: 0.5 }}
          >
            Link
          </motion.button>
          <motion.input
            type="email"
            placeholder="Parent Email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            whileFocus={{ scale: 1.02, borderColor: "#00d4ff" }}
            transition={{ duration: 0.3 }}
          />
        </motion.form>
        <motion.div
          className="table-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Parent Name</th>
                <th>Parent Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.linkedParent?.name || 'Not Linked'}</td>
                  <td>{student.linkedParent?.email || 'Not Linked'}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminStudentParentManagement;