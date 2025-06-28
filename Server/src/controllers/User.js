import bcrypt from "bcrypt";
import userModel from "../models/Usermodel.js";
import generateJwtToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";



// export const registerUser = async (req, res) => {
//   try {
//     console.log("📥 Signup Request Body:", req.body);

//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       console.log("❌ Missing fields");
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const userExists = await userModel.findOne({ email });
//     if (userExists) {
//       console.log("⚠️ User already exists:", email);
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await userModel.create({ name, email, password });
//     const userToken = user.generateJwtToken();

//     console.log("✅ User created:", user);

//     return res.status(201).json({
//       message: "User registered successfully",
//       user,
//       userToken,
//     });
//   } catch (error) {
//     console.error("💥 Signup Error:", error.message);
//     return res.status(500).json({ message: "Signup failed", error: error.message });
//   }
// };
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({ name, email, password });
    const token = user.generateJwtToken();

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Signup failed", error: error.message });
  }
};


// export const loginUser = async (req, res) => {
//   try {
//     console.log("📥 Incoming Login Body:", req.body); // 🔍 Log request body

//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       console.log("❌ No user found with this email"); // log email failure
//       return res.status(404).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       console.log("❌ Password did not match"); // log password mismatch
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const userToken = user.generateJwtToken();
//     console.log("✅ Login successful:", user.email); // success log

//     return res.status(200).json({
//       message: "Login successful",
//       user,
//       userToken,
//     });
//   } catch (error) {
//     console.error("💥 Backend Error:", error); // ❗ Full error log
//     return res.status(500).json({ message: error.message });
//   }
// };
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.generateJwtToken();

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get Logged In User Details
export const getUserDetails = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await userModel.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
