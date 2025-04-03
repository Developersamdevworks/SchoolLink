const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Teacher', 'Student', 'Parent'], required: true },
  linkedParent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For students
  linkedStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // For parents
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);