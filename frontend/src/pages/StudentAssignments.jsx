import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/StudentAssignments.css';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => { 
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/student/assignments', { headers: { 'x-auth-token': token } });
      setAssignments(res.data);
    };
    fetchAssignments();
  }, []);

  const submitAssignment = async (id) => {
    if (!fileUrl) return alert('Please provide a file URL');
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5000/api/student/assignments/submit/${id}`, { fileUrl }, { headers: { 'x-auth-token': token } });
      alert('Assignment submitted');
      setFileUrl('');
    } catch (error) {
      alert('Failed to submit assignment');
    }
  };

  return (
    <motion.div className="student-assignments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <nav className="student-nav"> {/* Add navbar */}
        <h1>Student Assignments</h1>
        <Link to="/student-panel">Student Panel</Link>
      </nav>
      <div className="assignment-list">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="assignment">
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            <input type="text" placeholder="File URL" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
            <button onClick={() => submitAssignment(assignment._id)}>Submit</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentAssignments;