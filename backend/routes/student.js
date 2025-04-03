const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');
const Notification = require('../models/Notification');
const Attendance = require('../models/Attendance');

router.get('/assignments', auth, async (req, res) => {
  if (req.user.role !== 'Student') return res.status(403).json({ msg: 'Access denied' });
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/assignments/submit/:id', auth, async (req, res) => {
  if (req.user.role !== 'Student') return res.status(403).json({ msg: 'Access denied' });
  const { fileUrl } = req.body;
  try {
    const assignment = await Assignment.findById(req.params.id);
    assignment.submissions.push({ student: req.user.id, fileUrl });
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/notifications', auth, async (req, res) => {
  if (req.user.role !== 'Student') return res.status(403).json({ msg: 'Access denied' });
  try {
    const notifications = await Notification.find().populate('teacher', 'name');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/attendance', auth, async (req, res) => {
  if (req.user.role !== 'Student') return res.status(403).json({ msg: 'Access denied' });
  const { status } = req.body;
  try {
    const attendance = new Attendance({ student: req.user.id, date: new Date(), status });
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;