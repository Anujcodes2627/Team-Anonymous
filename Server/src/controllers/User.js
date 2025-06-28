// import bcrypt from 'bcrypt';
// import userModel from '../models/Usermodel.js';
// import generateToken from '../utils/generateToken.js';

// export const registerUser = async(req,res) =>{
//     try {
//         const {name,email,password} = req.body;
//         const userExists = await userModel.findOne({email})
//         // Checking If User Already Exist With Entered Email
//         if(userExists)
//             return res.status(400).json({message:"User Already Exists"});
        
//         // Checking if email already exists as provider Email Id
//         const user = await userModel.create({name,email,password,phoneNumber});
//         generateToken(res,201,user,true)
//     } catch (error) {
//         return res.status(500).json({message:error})
//     }
// }
// export const loginUser = async(req,res) =>{
//     try {
//         const {email, password} = req.body;
//         const user = await userModel.findOne({email});
//         if(!user)
//             return res.status(404).json({message:"Invalid Email or Password"});
//         const passwordMatch = await bcrypt.compare(password,user.password)
//         if(!passwordMatch)
//             return res.status(400).json({message:"Invalid Email or Password"})
//         generateToken(res,200,user,true);
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
// }
// export const getUserDetails = async(req,res) =>{
//     try {
//       if(!req.user)
//         return res.status(400).json({message:"Invalid request"})
//       const user = await userModel.findOne(req.user._id);
  
//       if(!user)
//         return res.status(404).json({message:"No user found"});
//       return res.status(200).json({user});
//     } catch (error) {
//       return res.status(500).json({success:false})
//     }
// }

import userModel from "../models/Usermodel.js"; // ✅ model handles password hashing
import jwt from "jsonwebtoken";

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (password is hashed by schema middleware)
    const user = await userModel.create({ name, email, password });

    // Generate token
    const userToken = user.generateJwtToken();

    // Send response
    return res.status(201).json({
      message: "User registered successfully",
      user,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;


    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Compare password using instance method from schema
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userToken = user.generateJwtToken();

    return res.status(200).json({
      message: "Login successful",
      user,
      userToken,
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
