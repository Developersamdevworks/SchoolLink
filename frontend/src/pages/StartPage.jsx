import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaChalkboardTeacher, FaUsers, FaLaptopCode, FaFacebookF, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import "../styles/StartPage.css";

const App = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">School<span>Link</span></h1>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <motion.h2 className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering Schools with Smart Management
          </motion.h2>
          <p className="hero-subtitle">Streamline Administration & Enhance Learning</p>
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Panels Section */}
      <section className="panels">
        <div className="panels-container">
          <div className="panel">
            <FaChalkboardTeacher className="panel-icon" />
            <h3>Smart Teachers</h3>
            <p>Enhance the learning experience with All Students at one place.</p>
          </div>
          <div className="panel">
            <FaUsers className="panel-icon" />
            <h3>Student Management</h3>
            <p>Track attendance, grades, and performance efficiently.</p>
          </div>
          <div className="panel">
            <FaLaptopCode className="panel-icon" />
            <h3>Online Dairy</h3>
            <p>Get All the Data like Assignments and Notifications at one.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">School<span>Link</span></div>
        <div className="footer-center">Developed by SAM DEV WORKS</div>
        <div className="footer-socials">
          <span>Follow Us:</span>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaGithub /></a>
        </div>
      </footer>
    </>
  );
};

export default App;