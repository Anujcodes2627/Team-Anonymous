// import express from "express";
// import multer from "multer";
// import {
//   createBlog,
//   getAllBlogs,
//   getBlogById,
//   postComment,
// } from "../controllers/Blogs.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });
// const uploads = multer({ storage });

// router.post("/createBlog", uploads.single("coverImage"), createBlog);

// router.get("/", getAllBlogs);
// router.get("/:id", getBlogById);
// router.post("/comment/:blogId", postComment);

// export default router;
// routes/blog.route.js

import express from "express";
import multer from "multer";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  postComment,
} from "../controllers/Blogs.js";
// import { protect } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const uploads = multer({ storage });

router.post("/",uploads.single("coverImage"), createBlog);

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/comment/:blogId", postComment);

export default router;
