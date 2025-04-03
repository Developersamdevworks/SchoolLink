// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
      useUnifiedTopology: true // Use the new server discovery and monitoring engine
    });
    // Log a success message if the connection is established
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log an error message if the connection fails
    console.error('MongoDB connection error:', error.message);
    // Exit the process with a failure code (1) to indicate an error
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;