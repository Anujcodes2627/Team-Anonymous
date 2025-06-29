import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// // Define user schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 30,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//   },
// });
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // 👇 New fields for dashboard
  dashboardStats: {
    co2Saved: { type: Number, default: 0 },
    treesSaved: { type: Number, default: 0 },
    energySaved: { type: Number, default: 0 },
  },
  weeklyData: {
    thisWeek: { type: Number, default: 0 },
    lastWeek: { type: Number, default: 0 },
  },
  goals: {
    target: { type: Number, default: 100 },
    achieved: { type: Number, default: 0 },
  },
  achievements: {
    type: [String], 
    default: [],
  },
});

// Pre-save middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ userId: this._id }, "someSuperSecretKey12345", {
    expiresIn: "5d",
  });
};

// Export model
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
