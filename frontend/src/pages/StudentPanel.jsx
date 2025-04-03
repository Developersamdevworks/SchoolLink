import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Clock from '../components/Clock';
import { FaBook, FaClock, FaBell, FaSignOutAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/StudentPanel.css';

const StudentPanel = () => {
  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('Pending');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const [assignRes, notifRes] = await Promise.all([
        axios.get('http://localhost:5000/api/student/assignments', { headers: { 'x-auth-token': token } }),
        axios.get('http://localhost:5000/api/student/notifications', { headers: { 'x-auth-token': token } })
      ]);
      setAssignments(assignRes.data);
      setNotifications(notifRes.data);
    };
    fetchData();

    const target = new Date();
    target.setHours(12, 0, 0, 0); // Set target to 12:00 PM
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Attendance window closed');
        if (attendanceStatus === 'Pending' && now.getHours() >= 12) {
          setAttendanceStatus('Absent');
          markAbsentAutomatically();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [attendanceStatus]);

  const markAttendance = async () => {
    const now = new Date();
    if (now.getHours() >= 8 && now.getHours() < 12) {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          'http://localhost:5000/api/student/attendance',
          { status: 'Present' },
          { headers: { 'x-auth-token': token } }
        );

        // Check if the backend successfully updated the database
        if (response.status === 200 || response.status === 201) {
          setAttendanceStatus('Present');
          alert('Attendance marked as Present and updated in the database!');
          console.log('Database update successful:', response.data);
        } else {
          throw new Error('Failed to update attendance in the database');
        }
      } catch (error) {
        console.error('Error marking attendance:', error.response ? error.response.data : error.message);
        alert('Failed to mark attendance. Please try again.');
      }
    } else {
      alert('Attendance can only be marked between 8:00 AM and 12:00 PM');
    }
  };

  const markAbsentAutomatically = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/student/attendance',
        { status: 'Absent' },
        { headers: { 'x-auth-token': token } }
      );
      console.log('Automatically marked as Absent in the database:', response.data);
    } catch (error) {
      console.error('Error marking absent automatically:', error.response ? error.response.data : error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div className="student-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <nav className="student-nav">
        <h1>Student Panel</h1>
        <div className="nav-links">
          <Link to="/student-assignments">Assignments</Link>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>
      <div className="content">
        <div className="card">
          <h3>
            <FaBook className="card-icon" /> Assignments
          </h3>
          {assignments.length > 0 ? (
            assignments.slice(0, 3).map((assign) => (
              <div key={assign._id} className="card-item">
                <span className="card-item-title">{assign.title}</span>
                <span className="card-item-due">Due: {new Date(assign.dueDate).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <p className="card-item no-data">No assignments available</p>
          )}
        </div>
        <div className="card">
          <h3>
            <FaClock className="card-icon" /> Attendance
          </h3>
          <div className="card-item">
            <span className="card-item-title">Time Left:</span>
            <span className="card-item-value">{timeLeft}</span>
          </div>
          <div className="card-item">
            <span className="card-item-title">Status:</span>
            <span className={`status ${attendanceStatus.toLowerCase()}`}>
              {attendanceStatus === 'Present' ? <FaCheckCircle /> : <FaTimesCircle />}
              {attendanceStatus}
            </span>
          </div>
          <button
            onClick={markAttendance}
            disabled={attendanceStatus !== 'Pending' || timeLeft === 'Attendance window closed'}
            className="mark-attendance-btn"
          >
            Mark Attendance
          </button>
        </div>
        <div className="card">
          <h3>
            <FaBell className="card-icon" /> Notifications
          </h3>
          {notifications.length > 0 ? (
            notifications.slice(0, 3).map((notif) => (
              <div key={notif._id} className="card-item">
                <span className="card-item-title">{notif.message}</span>
                <span className="card-item-source">{notif.teacher.name}</span>
              </div>
            ))
          ) : (
            <p className="card-item no-data">No notifications available</p>
          )}
        </div>
      </div>
      <div className="clock-container">
        <Clock />
      </div>
    </motion.div>
  );
};

export default StudentPanel;