import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa'; // Icon for the submit button
import '../styles/ParentFeedback.css';

const ParentFeedback = () => {
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/parent/feedback', {
          headers: { 'x-auth-token': token }
        });
        setFeedbacks(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert('Feedback message cannot be empty');
    
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/parent/feedback',
        { message },
        { headers: { 'x-auth-token': token } }
      );
      setFeedbacks([res.data, ...feedbacks]);
      setMessage('');
      alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Failed to submit feedback', error);
      alert('Failed to submit feedback');
    }
  };

  if (isLoading) return <div className="parent-feedback-loading">Loading...</div>;

  return (
    <motion.div 
      className="parent-feedback"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="parent-feedback-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2>Submit Feedback</h2>
        <motion.form
          onSubmit={handleSubmit}
          className="parent-feedback-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your feedback here..."
            rows="5"
            required
            whileFocus={{ scale: 1.02, borderColor: "#00d4ff" }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            type="submit"
            className="parent-feedback-submit-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#45a049" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane className="parent-feedback-submit-icon" /> Submit Feedback
          </motion.button>
        </motion.form>

        <motion.div
          className="parent-feedback-list"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3>Your Previous Feedback</h3>
          {feedbacks.length === 0 ? (
            <p className="parent-feedback-no-data">No feedback submitted yet</p>
          ) : (
            <ul>
              {feedbacks.map((feedback, index) => (
                <motion.li
                  key={feedback._id}
                  className="parent-feedback-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p>{feedback.message}</p>
                  <small>Submitted on: {new Date(feedback.createdAt).toLocaleDateString()}</small>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ParentFeedback;