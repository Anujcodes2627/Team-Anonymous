import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const email = user?.email;
  // console.log(email);

  const deleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      // Get email from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const email = userInfo?.email;

      const res = await axios.delete(
        `http://localhost:4000/api/blogs/${blogId}`,
        {
          data: { email }, // ✅ send email inside an object
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Blog deleted successfully!");
        setBlogs((prev) => prev.filter((b) => b._id !== blogId));
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog.");
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs", {
          withCredentials: true,
        });

        setBlogs(res.data.blogs);
        // const token = JSON.parse(localStorage.getItem("userToken"))?.userToken;

        // const res = await axios.get("http://localhost:4000/api/blogs", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
      } catch (err) {
        console.error("Failed to load blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const goToVlogUpload = () => {
    navigate("/addblog");
  };

  return (
    <div className="min-h-screen bg-[#1F252C] text-white px-4 py-8 relative">
      {/* Top bar with Add Vlog button */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto px-2">
        <h1 className="text-3xl font-bold">📝 All Blogs</h1>
        <button
          onClick={goToVlogUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl"
        >
          ➕ Add Vlog
        </button>
      </div>

      {/* Blog cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-[#39414A] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/singleblog/${blog._id}`}>
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
                    {blog.createdBy?.email}
                  </span>
                </div>
              </div>
            </Link>

            {/* 🗑 Delete button only if user's email matches */}
            {blog.createdByEmail === email && (
              <div className="p-4">
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
