import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser'; // Import EmailJS
import { motion } from 'framer-motion';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Validate email and get reset link from backend
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      
      if (!response.data.success) {
        throw new Error(response.data.msg);
      }

      const { user, resetLink } = response.data;

      // Step 2: Send email using EmailJS
      const templateParams = {
        name: user.name,
        email: user.email,
        resetLink: resetLink,
      };

      await emailjs.send(
        'schoollink69@gmail.com',      // Replace with your EmailJS Service ID
        'SchoolLink_passreset',     // Replace with your EmailJS Template ID
        templateParams,
        'l1iZ3VGM6y1EbBFqj'       // Replace with your EmailJS Public Key
      );

      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      const errorMsg = error.response?.data?.msg || error.message || 'Failed to send reset link. Please try again.';
      setMessage(errorMsg);
    }
  };

  return (
    <motion.div
      className="forgot-password-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <form onSubmit={handleForgotPassword}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
      <Link to="/login" className="back-to-login">Back to Login</Link>
    </motion.div>
  );
};

export default ForgotPassword;