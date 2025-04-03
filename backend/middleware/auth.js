// Import the jsonwebtoken library to handle JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Middleware function to authenticate requests using JWT
const auth = (req, res, next) => {
  // Retrieve the token from the request header
  const token = req.header('x-auth-token');

  // If no token is provided, return a 401 Unauthorized response
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, return a 401 Unauthorized response
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Export the auth middleware to be used in other parts of the application
module.exports = auth;