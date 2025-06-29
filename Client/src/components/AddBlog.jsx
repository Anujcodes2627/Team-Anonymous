// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // export default function AddBlogForm() {
// // //   const [title, setTitle] = useState("");
// // //   const [body, setBody] = useState("");
// // //   const [coverImage, setCoverImage] = useState(null);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     // Prepare multipart/form-data
// // //     const formData = new FormData();
// // //     formData.append("title", title);
// // //     formData.append("body", body);
// // //     formData.append("coverImage", coverImage);

// // //     try {
// // //       const response = await axios.post(
// // //         "http://localhost:4000/blog",
// // //         formData,
// // //         {
// // //           withCredentials: true, // if using cookies
// // //           headers: {
// // //             "Content-Type": "multipart/form-data",
// // //           },
// // //         }
// // //       );
// // //       console.log("Blog uploaded:", response.data);
// // //       // Redirect or show success message
// // //     } catch (err) {
// // //       console.error("Error uploading blog:", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mt-4">
// // //       <form onSubmit={handleSubmit} encType="multipart/form-data">
// // //         <div className="mb-3">
// // //           <label htmlFor="coverImage" className="form-label">
// // //             Cover Image
// // //           </label>
// // //           <input
// // //             type="file"
// // //             id="coverImage"
// // //             name="coverImage"
// // //             className="form-control"
// // //             onChange={(e) => setCoverImage(e.target.files[0])}
// // //           />
// // //         </div>

// // //         <div className="mb-3">
// // //           <label htmlFor="title" className="form-label">
// // //             Title
// // //           </label>
// // //           <input
// // //             type="text"
// // //             className="form-control"
// // //             id="title"
// // //             name="title"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //           />
// // //         </div>

// // //         <div className="mb-3">
// // //           <label htmlFor="body" className="form-label">
// // //             Body
// // //           </label>
// // //           <textarea
// // //             className="form-control"
// // //             id="body"
// // //             rows="3"
// // //             name="body"
// // //             value={body}
// // //             onChange={(e) => setBody(e.target.value)}
// // //           ></textarea>
// // //         </div>

// // //         <button type="submit" className="btn btn-primary mb-3">
// // //           Upload
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import axios from "axios";

// // export default function AddBlogForm() {
// //   const [title, setTitle] = useState("");
// //   const [body, setBody] = useState("");
// //   const [coverImage, setCoverImage] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Prepare multipart/form-data
// //     const formData = new FormData();
// //     formData.append("title", title);
// //     formData.append("body", body);
// //     formData.append("coverImage", coverImage);

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:4000/blog",
// //         formData,
// //         {
// //           withCredentials: true, // if using cookies
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );
// //       console.log("Blog uploaded:", response.data);
// //       // Redirect or show success message
// //     } catch (err) {
// //       console.error("Error uploading blog:", err);
// //     }
// //   };

// //   return (
// //     <div className="container mt-4">
// //       <form onSubmit={handleSubmit} encType="multipart/form-data">
// //         <div className="mb-3">
// //           <label htmlFor="coverImage" className="form-label">
// //             Cover Image
// //           </label>
// //           <input
// //             type="file"
// //             id="coverImage"
// //             name="coverImage"
// //             className="form-control"
// //             onChange={(e) => setCoverImage(e.target.files[0])}
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label htmlFor="title" className="form-label">
// //             Title
// //           </label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="title"
// //             name="title"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label htmlFor="body" className="form-label">
// //             Body
// //           </label>
// //           <textarea
// //             className="form-control"
// //             id="body"
// //             rows="3"
// //             name="body"
// //             value={body}
// //             onChange={(e) => setBody(e.target.value)}
// //           ></textarea>
// //         </div>

// //         <button type="submit" className="btn btn-primary mb-3">
// //           Upload
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import axios from "axios";

// export default function AddBlogForm() {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [coverImage, setCoverImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("body", body);
//     formData.append("coverImage", coverImage);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/blogs", 
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("✅ Blog uploaded:", response.data);
//       alert("Blog uploaded successfully!");
//       setTitle("");
//       setBody("");
//       setCoverImage(null);
//     } catch (err) {
//       console.error("❌ Error uploading blog:", err);
//       alert("Failed to upload blog.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="mb-3">
//           <label htmlFor="coverImage" className="form-label">Cover Image</label>
//           <input
//             type="file"
//             id="coverImage"
//             name="coverImage"
//             className="form-control"
//             onChange={(e) => setCoverImage(e.target.files[0])}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="body" className="form-label">Body</label>
//           <textarea
//             className="form-control"
//             id="body"
//             rows="3"
//             name="body"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           ></textarea>
//         </div>

//         <button type="submit" className="btn btn-primary mb-3">Upload</button>
//       </form>
//     </div>
//   );
// }
