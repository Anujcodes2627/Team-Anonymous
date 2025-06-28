// // // // import { Router } from 'express';
// // // // import Blog from '../models/blog.js';
// // // // import Comment from '../models/comment.js';
// // // // import multer from 'multer';

// // // // const router = Router();

// // // // // File upload config
// // // // const storage = multer.diskStorage({
// // // //   destination: function (req, file, cb) {
// // // //     cb(null, './public/uploads');
// // // //   },
// // // //   filename: function (req, file, cb) {
// // // //     const fileName = `${Date.now()}-${file.originalname}`;
// // // //     cb(null, fileName);
// // // //   },
// // // // });
// // // // const uploads = multer({ storage });

// // // // // ✅ Create a new blog post
// // // // router.post('/', uploads.single('coverImage'), async (req, res) => {
// // // //   try {
// // // //     const { title, body } = req.body;
// // // //     const coverImageURL = req.file ? `/uploads/${req.file.filename}` : null;

// // // //     const blog = await Blog.create({
// // // //       title,
// // // //       body,
// // // //       createdBy: req.user._id,
// // // //       coverImageURL,
// // // //     });

// // // //     res.status(201).json({ success: true, blog });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, message: 'Failed to create blog', error: err.message });
// // // //   }
// // // // });

// // // // // ✅ Get all blogs
// // // // router.get('/', async (req, res) => {
// // // //   try {
// // // //     const blogs = await Blog.find().populate('createdBy').sort({ createdAt: -1 });
// // // //     res.json({ success: true, blogs });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, message: 'Failed to fetch blogs', error: err.message });
// // // //   }
// // // // });

// // // // // ✅ Get single blog by ID
// // // // router.get('/:id', async (req, res) => {
// // // //   try {
// // // //     const blog = await Blog.findById(req.params.id).populate('createdBy');
// // // //     const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy');

// // // //     res.json({
// // // //       success: true,
// // // //       blog,
// // // //       comments,
// // // //     });
// // // //   } catch (err) {
// // // //     res.status(404).json({ success: false, message: 'Blog not found', error: err.message });
// // // //   }
// // // // });

// // // // // ✅ Post a comment
// // // // router.post('/comment/:blogId', async (req, res) => {
// // // //   try {
// // // //     const { content } = req.body;

// // // //     const comment = await Comment.create({
// // // //       content,
// // // //       blogId: req.params.blogId,
// // // //       createdBy: req.user._id,
// // // //     });

// // // //     res.status(201).json({ success: true, comment });
// // // //   } catch (err) {
// // // //     res.status(500).json({ success: false, message: 'Failed to add comment', error: err.message });
// // // //   }
// // // // });

// // // // export default router;

// // // import { Router } from "express";
// // // import multer from "multer";
// // // import {
// // //   createBlog,
// // //   getAllBlogs,
// // //   getBlogById,
// // //   postComment,
// // // } from "../controllers/Blogs.js";

// // // const router = Router();

// // // // File upload config
// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, "./public/uploads");
// // //   },
// // //   filename: function (req, file, cb) {
// // //     const fileName = `${Date.now()}-${file.originalname}`;
// // //     cb(null, fileName);
// // //   },
// // // });
// // // const uploads = multer({ storage });

// // // // Routes
// // // router.post("/", uploads.single("coverImage"), createBlog);
// // // router.get("/blog", getAllBlogs);
// // // router.get("/:id", getBlogById);
// // // router.post("/comment/:blogId", postComment);

// // // export default router;

// // import { Router } from "express";
// // import multer from "multer";
// // import {
// //   createBlog,
// //   getAllBlogs,
// //   getBlogById,
// //   postComment,
// // } from "../controllers/Blogs.js";

// // const router = Router();

// // // File upload config
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "./public/uploads");
// //   },
// //   filename: function (req, file, cb) {
// //     const fileName = `${Date.now()}-${file.originalname}`;
// //     cb(null, fileName);
// //   },
// // });
// // const uploads = multer({ storage });

// // // Routes
// // router.post("/", uploads.single("coverImage"), createBlog);
// // router.get("/blog", getAllBlogs);
// // router.get("/:id", getBlogById);
// // router.post("/comment/:blogId", postComment);

// // export default router;
// import { Router } from "express";
// import multer from "multer";
// import {
//   createBlog,
//   getAllBlogs,
//   getBlogById,
//   postComment,
// } from "../controllers/Blogs.js";

// const router = Router();

// // File upload config
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

// // ✅ Routes
// router.post("/", uploads.single("coverImage"), createBlog);         // POST /api/blog/
// router.get("/", getAllBlogs);                                       // GET  /api/blog/
// router.get("/:id", getBlogById);                                    // GET  /api/blog/:id
// router.post("/comment/:blogId", postComment);                       // POST /api/blog/comment/:blogId

// export default router;

import express from "express";
import multer from "multer";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  postComment,
} from "../controllers/Blogs.js";

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

router.post("/", uploads.single("coverImage"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/comment/:blogId", postComment);

export default router;
