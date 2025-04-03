// Import the mongoose library to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Notification model
const notificationSchema = new mongoose.Schema({
  // Message content of the notification (required field)
  message: { type: String, required: true },

  // Reference to the teacher associated with the notification (required field)
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Refers to the User model
    required: true 
  }
}, 
// Enable automatic creation of `createdAt` and `updatedAt` timestamps
{ timestamps: true });

// Export the Notification model to be used in other parts of the application
module.exports = mongoose.model('Notification', notificationSchema);