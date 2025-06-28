import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./routes/userroute.js"; 
dotenv.config(); 

const app = express();

// ✅ Middlewares
app.use(express.json()); // Parses JSON request body
app.use(cookieParser());

// ✅ CORS
app.use(
  cors({
    origin: ["http://localhost:5173"], // Local frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true, // Allow cookies
  })
);

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/Pollution", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Database Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Base Route
app.get("/", (req, res) => {
  res.send("🚀 Server is working!");
});

// ✅ API Routes
app.use("/user", user);

// ✅ Server Listen
app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});
