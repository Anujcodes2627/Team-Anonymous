
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // ✅ This allows .populate('createdBy') to work
    },
    createdByEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model('blog', blogSchema);

export default Blog;
