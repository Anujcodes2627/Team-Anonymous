import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogUploadForm() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!user && !storedUser) {
      alert("Please login to upload a vlog.");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || !coverImage) {
      return alert("All fields are required.");
    }

    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    const tokenObj = JSON.parse(localStorage.getItem("userToken"));

    const email = storedUser?.email;
    const token = tokenObj?.userToken;

    if (!email) {
      return alert("User email not found. Please log in again.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", coverImage);
    formData.append("createdByEmail", email);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.data.success) {
        alert("Vlog uploaded successfully!");
        setTitle("");
        setBody("");
        setCoverImage(null);
        navigate("/blogs");
      } else {
        alert("Blog creation failed.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while uploading vlog."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Vlog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="coverImage" className="block mb-1 font-medium">
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block mb-1 font-medium">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Upload Vlog
        </button>
      </form>
    </div>
  );
}
