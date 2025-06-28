// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import user from "./routes/userroute.js";
// import blogRoute from "./routes/blog.js";
// import path from "path";

// import { fileURLToPath } from "url";
// dotenv.config();

// const app = express();

// // ✅ Middlewares
// app.use(express.json());
// app.use(cookieParser());
// // app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
// // ✅ CORS Setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "..", "public", "uploads"))
// );

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
//     credentials: true,
//   })
// );

// // ✅ MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/Pollution", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Database Connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ✅ Base Route
// app.get("/", (req, res) => {
//   res.send("🚀 Server is working!");
// });

// // ✅ Routes
// app.use("/user", user);
// app.use("/blog", blogRoute);

// // ✅ Start Server
// app.listen(4000, () => {
//   console.log("🚀 Server running at http://localhost:4000");
// });

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userroute.js";
import blogRoutes from "./routes/blog.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // match your frontend port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/Pollution", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// API Routes
app.use("/api/users", userRoutes); // example: /api/users/login
app.use("/api/blogs", blogRoutes); // example: /api/blogs, /api/blogs/:id

// Start the server
app.listen(4000, () => {
  console.log(`🚀 Server running at http://localhost`, 4000);
});
