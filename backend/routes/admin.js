const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Notification = require('../models/Notification');

router.get('/stats', auth, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });
  try {
    const stats = {
      students: await User.countDocuments({ role: 'Student' }),
      teachers: await User.countDocuments({ role: 'Teacher' }),
      parents: await User.countDocuments({ role: 'Parent' })
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/teachers', auth, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });
  try {
    const teachers = await User.find({ role: 'Teacher' }).select('name email');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/student-parents', auth, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });
  try {
    const students = await User.find({ role: 'Student' }).populate('linkedParent', 'name email');
    res.json(students);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/link-student-parent', auth, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });
  const { studentEmail, parentEmail } = req.body;
  try {
    const student = await User.findOne({ email: studentEmail, role: 'Student' });
    const parent = await User.findOne({ email: parentEmail, role: 'Parent' });
    if (!student || !parent) return res.status(404).json({ msg: 'User not found' });

    student.linkedParent = parent._id;
    parent.linkedStudent = student._id;
    await student.save();
    await parent.save();
    res.json({ msg: 'Linked successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/notifications', auth, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });
  try {
    const notifications = await Notification.find().populate('teacher', 'name');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;