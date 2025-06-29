import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SingleBlog() {
  const { id } = useParams(); // blog id from URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        setBlog(response.data.blog);
      } catch (err) {
        console.error("Failed to load blog:", err);
        alert("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!blog) return <div className="text-center mt-8">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <button
        onClick={() => navigate("/blogs")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Blogs
      </button>

      {blog.coverImageURL && (
        <img
          src={`http://localhost:4000/${blog.coverImageURL}`}
          alt="Blog cover"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Posted by {blog.createdByEmail} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="text-lg leading-relaxed whitespace-pre-line">{blog.body}</div>
    </div>
  );
}
