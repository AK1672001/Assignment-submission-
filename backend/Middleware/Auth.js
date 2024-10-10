const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Auth = (req, res, next) => {
  // Middleware to verify token and extract user info

  const authHeader = req.header("Authorization");

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Ensure the Authorization header contains a Bearer token
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid token format" });
  }

  // Extract the token by removing "Bearer " prefix
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = Auth;
