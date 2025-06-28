import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
} from "../controllers/User.js";

const router = express.Router();

// ✅ Register Route
router.post("/signup", registerUser);

// ✅ Login Route (you missed the `/`)
router.post("/login", loginUser);

// ✅ Get User Details Route
router.get("/me", getUserDetails);


export default router;
