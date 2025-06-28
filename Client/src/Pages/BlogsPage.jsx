// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function BlogsPage() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/blog", {
//           withCredentials: true,
//         });
//         console.log(res.data);

//         setBlogs(res.data);
//       } catch (err) {
//         console.error("Failed to load blogs:", err);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#1F252C] text-white px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">📝 All Blogs</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {blogs.map((blog) => (
//           <Link
//             to={`/blog/${blog._id}`}
//             key={blog._id}
//             className="bg-[#39414A] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
//           >
//             <img
//               src={blog.coverImageURL}
//               alt="Cover"
//               className="w-full h-48 object-cover rounded-t-2xl"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
//               <p className="text-sm text-gray-300 line-clamp-3">
//                 {blog.body.slice(0, 150)}...
//               </p>
//               <div className="mt-4 flex items-center gap-3">
//                 <img
//                   src={blog.createdBy?.profileImageURL}
//                   alt="author"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="text-sm text-gray-400">
//                   {blog.createdBy?.fullName}
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs", {
          withCredentials: true,
        });
        console.log(res.data);
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#1F252C] text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">📝 All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="bg-[#39414A] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={blog.coverImageURL}
              alt="Cover"
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-300 line-clamp-3">
                {blog.body.slice(0, 150)}...
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={blog.createdBy?.profileImageURL}
                  alt="author"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-400">
                  {blog.createdBy?.fullName}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
