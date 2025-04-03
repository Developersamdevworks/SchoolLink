// Import the mongoose library to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Attendance model
const attendanceSchema = new mongoose.Schema({
  // Reference to the student for whom the attendance is recorded (required field)
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Date of the attendance record (required field)
  date: { type: Date, required: true },

  // Status of the attendance (either 'Present' or 'Absent', required field)
  status: { type: String, enum: ['Present', 'Absent'], required: true }
}, 
// Enable automatic creation of `createdAt` and `updatedAt` timestamps
{ timestamps: true });

// Export the Attendance model to be used in other parts of the application
module.exports = mongoose.model('Attendance', attendanceSchema);