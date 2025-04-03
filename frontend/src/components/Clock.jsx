import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import '../styles/Clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="clock"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
    </motion.div>
  );
};

export default Clock;