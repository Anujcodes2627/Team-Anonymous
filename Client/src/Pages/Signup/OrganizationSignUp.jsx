import React, { useState } from "react";

export default function OrganizationSignUp() {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    contactPerson: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Organization SignUp:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md space-y-4 shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Organization Sign Up
        </h2>

        <input
          type="text"
          name="organizationName"
          placeholder="Organization Name"
          className="w-full px-4 py-2 rounded bg-slate-700"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-slate-700"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          className="w-full px-4 py-2 rounded bg-slate-700"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full px-4 py-2 rounded bg-slate-700"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full px-4 py-2 rounded bg-slate-700"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-slate-700"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 rounded bg-slate-700"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
