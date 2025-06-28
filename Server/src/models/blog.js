// import mongoose from 'mongoose';

// const { Schema, model } = mongoose;

// const blogSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     body: {
//       type: String,
//       required: true,
//     },
//     coverImageURL: {
//       type: String,
//       required: false,
//     },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'user',
//     },
//   },
//   { timestamps: true }
// );

// const Blog = model('blog', blogSchema);

// export default Blog;

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
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

const Blog = model('blog', blogSchema); // ✅ Capitalized name

export default Blog;
