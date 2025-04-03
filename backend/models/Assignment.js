// Import the mongoose library to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Assignment model
const assignmentSchema = new mongoose.Schema({
  // Title of the assignment (required field)
  title: { type: String, required: true },

  // Description of the assignment (required field)
  description: { type: String, required: true },

  // Due date for the assignment submission (required field)
  dueDate: { type: Date, required: true },

  // Reference to the teacher who created the assignment (required field)
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Array of submissions for the assignment
  submissions: [{
    // Reference to the student who submitted the assignment
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // URL of the submitted file
    fileUrl: String,

    // Timestamp of when the assignment was submitted (default is the current date and time)
    submittedAt: { type: Date, default: Date.now }
  }]
}, 
// Enable automatic creation of `createdAt` and `updatedAt` timestamps
{ timestamps: true });

// Export the Assignment model to be used in other parts of the application
module.exports = mongoose.model('Assignment', assignmentSchema);