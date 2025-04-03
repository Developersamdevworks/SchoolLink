import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/AdminTeacherManagement.css";

const AdminTeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/teachers", {
        headers: { "x-auth-token": token },
      });
      setTeachers(res.data);
    };
    fetchTeachers();
  }, []);

  return (
    <motion.div
      className="admin-teacher-management"
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
        <h3>Teachers</h3>
        <motion.div
          className="table-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.table
            className="teacher-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <motion.tr
                  key={teacher._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminTeacherManagement;