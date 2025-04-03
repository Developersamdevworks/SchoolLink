const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const Notification = require('../models/Notification');
const Result = require('../models/Result');
const Attendance = require('../models/Attendance');
const Feedback = require('../models/Feedback');

// Get all student data
router.get('/student-data', auth, async (req, res) => {
  if (req.user.role !== 'Parent') return res.status(403).json({ msg: 'Access denied' });
  try {
    const parent = await User.findById(req.user.id).populate('linkedStudent');
    if (!parent.linkedStudent) return res.status(404).json({ msg: 'No student linked' });

    const studentId = parent.linkedStudent._id;
    const assignments = await Assignment.find({ 'submissions.student': studentId });
    const notifications = await Notification.find();
    const results = await Result.find({ student: studentId });
    const attendance = await Attendance.find({ student: studentId });

    res.json({ assignments, notifications, results, attendance, student: parent.linkedStudent });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Submit feedback
router.post('/feedback', auth, async (req, res) => {
  if (req.user.role !== 'Parent') return res.status(403).json({ msg: 'Access denied' });
  try {
    const parent = await User.findById(req.user.id).populate('linkedStudent');
    if (!parent.linkedStudent) return res.status(404).json({ msg: 'No student linked' });

    const { message } = req.body;
    if (!message) return res.status(400).json({ msg: 'Message is required' });

    const feedback = new Feedback({
      parent: req.user.id,
      student: parent.linkedStudent._id,
      message
    });

    await feedback.save();
    res.json(feedback);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get parent's feedback history
router.get('/feedback', auth, async (req, res) => {
  if (req.user.role !== 'Parent') return res.status(403).json({ msg: 'Access denied' });
  try {
    const feedbacks = await Feedback.find({ parent: req.user.id })
      .populate('student', 'name')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;