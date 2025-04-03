// Import the mongoose library to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Feedback model
const FeedbackSchema = new mongoose.Schema({
  // Reference to the parent providing the feedback (required field)
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
    required: true
  },

  // Reference to the student related to the feedback (required field)
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
    required: true
  },

  // Message content of the feedback (required field)
  message: {
    type: String,
    required: true
  },

  // Timestamp for when the feedback was created (default is the current date and time)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Feedback model to be used in other parts of the application
module.exports = mongoose.model('Feedback', FeedbackSchema);