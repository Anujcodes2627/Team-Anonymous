import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'blog',
    },
  },
  { timestamps: true }
);

const Comment = model('comment', commentSchema);

export default Comment;
