import jwt from "jsonwebtoken";
import userModel from "../models/Usermodel.js";

// Middleware to protect routes and attach user to request
export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract token

    try {
      // Verify token using same secret used in generateJwtToken()
      const decoded = jwt.verify(token, "someSuperSecretKey12345");

      // Attach user to request (excluding password)
      const user = await userModel.findById(decoded.userId).select("-password");

      if (!user) {
        console.warn("🔒 Token valid but user not found in DB.");
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next(); // Pass control to next middleware or route handler
    } catch (error) {
      console.error("❌ Token verification failed:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    console.warn("⚠️ No token found in request headers.");
    return res.status(401).json({ message: "No token provided" });
  }
};
