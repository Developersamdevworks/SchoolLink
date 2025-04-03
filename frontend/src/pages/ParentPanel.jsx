import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Clock from '../components/Clock';
import ParentFeedback from '../components/ParentFeedback';
import { FaUserCheck, FaTasks, FaChartLine, FaBell, FaClock } from 'react-icons/fa'; // Import icons
import '../styles/ParentPanel.css';

const ParentPanel = () => {
  const [studentData, setStudentData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/parent/student-data', { 
          headers: { 'x-auth-token': token } 
        });
        setStudentData(res.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching student data:', err);
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!studentData) return <div>No student data found</div>;

  return (
    <motion.div className="parent-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <nav className="parent-nav">
        <h1>Parent Panel</h1>
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'feedback' ? 'active' : ''} 
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      {activeTab === 'dashboard' ? (
        <>
          <div className="parent-info">
            <div className="info-box">
              <p><strong>Student Name:</strong> {studentData.student.name}</p>
              <p><strong>Student Email:</strong> {studentData.student.email}</p>
            </div>
          </div>
          <div className="content-grid">
            <div className="card">
              <h3><FaUserCheck className="card-icon" /> Attendance</h3>
              <ul>
                <li>Total Presents: <strong>{studentData.attendance.filter(a => a.status === 'Present').length}</strong></li>
                <li>Total Absents: <strong>{studentData.attendance.filter(a => a.status === 'Absent').length}</strong></li>
              </ul>
            </div>
            <div className="card">
              <h3><FaTasks className="card-icon" /> Assignments</h3>
              <ul>
                <li>Total: <strong>{studentData.assignments.length}</strong></li>
                {studentData.assignments.length > 0 ? (
                  studentData.assignments.slice(0, 3).map((assign) => (
                    <li key={assign._id}>{assign.title}</li>
                  ))
                ) : (
                  <li>No assignments available</li>
                )}
              </ul>
            </div>
            <div className="card">
              <h3><FaChartLine className="card-icon" /> Results</h3>
              <ul>
                {studentData.results.length > 0 ? (
                  studentData.results.slice(0, 3).map((result) => (
                    <li key={result._id}>{result.subject}: <strong>{result.marks}</strong></li>
                  ))
                ) : (
                  <li>No results available</li>
                )}
              </ul>
            </div>
            <div className="card">
              <h3><FaBell className="card-icon" /> Notifications</h3>
              <ul>
                {studentData.notifications.length > 0 ? (
                  studentData.notifications.slice(0, 3).map((notif) => (
                    <li key={notif._id}>{notif.message}</li>
                  ))
                ) : (
                  <li>No notifications available</li>
                )}
              </ul>
            </div>
            <div className="card">
              <h3><FaClock className="card-icon" /> Time</h3>
              <Clock />
            </div>
          </div>
        </>
      ) : (
        <ParentFeedback />
      )}
    </motion.div>
  );
};

export default ParentPanel;