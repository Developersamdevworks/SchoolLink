const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');
const Notification = require('../models/Notification');
const Result = require('../models/Result');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

// Assignments
router.get('/assignments', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    const assignments = await Assignment.find({ teacher: req.user.id });
    res.json(assignments);
  } catch (error) {
    console.error('Get assignments error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/assignments', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  const { title, description, dueDate } = req.body;
  try {
    const assignment = new Assignment({ title, description, dueDate, teacher: req.user.id });
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    console.error('Post assignment error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/assignments/:id', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Assignment deleted' });
  } catch (error) {
    console.error('Delete assignment error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Notifications
router.get('/notifications', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    const notifications = await Notification.find({ teacher: req.user.id });
    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/notifications', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  const { message } = req.body;
  try {
    const notification = new Notification({ message, teacher: req.user.id });
    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error('Post notification error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/notifications/:id', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Results
router.get('/results', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    const results = await Result.find({ teacher: req.user.id }).populate('student', 'name email'); // Include email in populate
    res.json(results);
  } catch (error) {
    console.error('Get results error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/results', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  const { studentEmail, subject, marks } = req.body; // Changed from student to studentEmail
  try {
    // Find student by email
    const student = await User.findOne({ email: studentEmail, role: 'Student' });
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const result = new Result({
      student: student._id, // Use student ID from email lookup
      subject,
      marks,
      teacher: req.user.id,
    });
    await result.save();

    // Populate student details in response
    const populatedResult = await Result.findById(result._id).populate('student', 'name email');
    res.json(populatedResult);
  } catch (error) {
    console.error('Post result error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/results/:id', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Result deleted' });
  } catch (error) {
    console.error('Delete result error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Students
router.get('/students', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    const students = await User.find({ role: 'Student' }).select('name email');
    res.json(students);
  } catch (error) {
    console.error('Get students error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Feedback
router.get('/feedback', auth, async (req, res) => {
  if (req.user.role !== 'Teacher') return res.status(403).json({ msg: 'Access denied' });
  try {
    const feedbacks = await Feedback.find()
      .populate('parent', 'name')
      .populate('student', 'name')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Get feedback error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;