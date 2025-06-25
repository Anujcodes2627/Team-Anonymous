import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar() {
  // 🔍 Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // 🌐 Navigation links array
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Air Quality", path: "/air-quality" },
    { name: "Forecast", path: "/forecast" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md mb-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold tracking-tight"
        >
          <span className="text-sky-400">AQ</span>
          <span className="text-green-400">I</span>
        </Link>

        {/* Search Bar */}
        <div className="relative md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search any Location, City, State or Country"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 rounded-md bg-slate-700/60 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Right-side Nav Links */}
        <div className="hidden md:flex items-center gap-4 text-sm text-white">
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
