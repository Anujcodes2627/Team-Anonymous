import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import "../models/Usermodel.js";

export const logError = (error, location = "Unknown Location") => {
  console.error("❌ ERROR in", location);
  console.error("Message:", error.message);
  console.error("Stack:", error.stack);
  console.error("Time:", new Date().toISOString());
};

export const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const email = req.body.createdByEmail;
    // console.log(email);

    const coverImageURL = req.file ? `/uploads/${req.file.filename}` : null;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const blog = await Blog.create({
      title,
      body,
      coverImageURL,
      createdByEmail: email,
    });

    res.status(201).json({ success: true, blog });
  } catch (err) {
    console.error("❌ CREATE BLOG ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: err.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("createdBy")
      .sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (err) {
    console.log("💥 Server error in getAllBlogs:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: err.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    res.json({ success: true, blog, comments });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: err.message,
    });
  }
};

export const postComment = async (req, res) => {
  try {
    const { content } = req.body;

    const comment = await Comment.create({
      content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, comment });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: err.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const email = req.body.email;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.createdByEmail !== email) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    console.error("❌ Error deleting blog:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export const singleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId).populate(
      "createdBy",
      "name email"
    );

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("❌ Error in getSingleBlog:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
