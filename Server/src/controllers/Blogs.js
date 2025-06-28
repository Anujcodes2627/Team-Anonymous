// // import blogs from "../models/blog.js";
// // import Comment from "../models/comment.js";

// // export const createBlog = async (req, res) => {
// //   try {
// //     const { title, body } = req.body;
// //     const coverImageURL = req.file ? `/uploads/${req.file.filename}` : null;

// //     const blog = await blogs.create({
// //       title,
// //       body,
// //       createdBy: req.user._id,
// //       coverImageURL,
// //     });

// //     res.status(201).json({ success: true, blog });
// //   } catch (err) {
// //     res
// //       .status(500)
// //       .json({
// //         success: false,
// //         message: "Failed to create blog",
// //         error: err.message,
// //       });
// //   }
// // };

// // export const getAllBlogs = async (req, res) => {
// //   try {
// //     const blogs = await blogs
// //       .find()
// //       .populate("createdBy")
// //       .sort({ createdAt: -1 });
// //     res.json({ success: true, blogs });
// //   } catch (err) {
// //     res
// //       .status(500)
// //       .json({
// //         success: false,
// //         message: "Failed to fetch blogs",
// //         error: err.message,
// //       });
// //   }
// // };

// // export const getBlogById = async (req, res) => {
// //   try {
// //     const blog = await blogs.findById(req.params.id).populate("createdBy");
// //     const comments = await Comment.find({ blogId: req.params.id }).populate(
// //       "createdBy"
// //     );

// //     res.json({ success: true, blog, comments });
// //   } catch (err) {
// //     res
// //       .status(404)
// //       .json({ success: false, message: "Blog not found", error: err.message });
// //   }
// // };

// // export const postComment = async (req, res) => {
// //   try {
// //     const { content } = req.body;

// //     const comment = await Comment.create({
// //       content,
// //       blogId: req.params.blogId,
// //       createdBy: req.user._id,
// //     });

// //     res.status(201).json({ success: true, comment });
// //   } catch (err) {
// //     res
// //       .status(500)
// //       .json({
// //         success: false,
// //         message: "Failed to add comment",
// //         error: err.message,
// //       });
// //   }
// // };

// import Blog from "../models/blog.js";
// import Comment from "../models/comment.js";

// export const createBlog = async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     const coverImageURL = req.file ? `/uploads/${req.file.filename}` : null;

//     const blog = await Blog.create({
//       title,
//       body,
//       createdBy: req.user._id,
//       coverImageURL,
//     });

//     res.status(201).json({ success: true, blog });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create blog",
//       error: err.message,
//     });
//   }
// };

// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate("createdBy").sort({ createdAt: -1 });
//     res.json({ success: true, blogs });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch blogs",
//       error: err.message,
//     });
//   }
// };

// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate("createdBy");
//     const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

//     res.json({ success: true, blog, comments });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "Blog not found",
//       error: err.message,
//     });
//   }
// };

// export const postComment = async (req, res) => {
//   try {
//     const { content } = req.body;

//     const comment = await Comment.create({
//       content,
//       blogId: req.params.blogId,
//       createdBy: req.user._id,
//     });

//     res.status(201).json({ success: true, comment });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to add comment",
//       error: err.message,
//     });
//   }
// };

import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import "../models/Usermodel.js"; // 👈 This registers the user model into mongoose


export const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const coverImageURL = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL,
    });

    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: err.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy").sort({ createdAt: -1 });
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
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

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
