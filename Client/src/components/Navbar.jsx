import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar() {
  //  Navigation links array
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Login", path: "/login" },  
    { name: "SignUp", path: "/signup" },  
    { name: "Contact", path: "/contact" },
    { name: "Air Quality", path: "/air-quality" },
    { name: "Forecast", path: "/forecast" },
  ];

  return (
    <header className="sticky top-0 z-50 h-8 w-full bg-slate-900/80 backdrop-blur-md ">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold tracking-tight"
        >
          <span className="text-sky-400">AQ</span>
          <span className="text-green-400">I</span>
        </Link>

        {/* Right-side Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="hover:text-sky-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
