import express from "express";
import multer from "multer";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  postComment,
  deleteBlog
} from "../controllers/Blogs.js";
import { protect } from "../middleware/auth.js";
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
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/",uploads.single("coverImage"), createBlog);
router.post("/comment/:blogId", protect, postComment);
router.delete("/:id", deleteBlog);

export default router;
