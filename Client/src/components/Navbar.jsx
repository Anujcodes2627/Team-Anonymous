"use client";

import { Link } from "react-router-dom"; // using React Router instead of next/link
import {
  Search,
  RotateCcw,
  ChevronDown,
  Globe,
  Moon,
  ArrowRight,
} from "lucide-react";
// import { Button } from "@/components/ui/button";

/**
 * Main top navigation bar, responsive & glassy.
 * Works with Vite + React Router (not Next.js).
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/70 bg-slate-900/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold tracking-tight">
          <span className="text-sky-400">AQ</span>
          <span className="text-green-400">I</span>
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search any Location, City, State or Country"
            className="w-80 rounded-md bg-slate-700/60 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <button className="hidden md:inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-slate-700/50">
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Main menu items */}
        <ul className="ml-4 hidden lg:flex gap-6 text-sm font-medium text-slate-200">
          {[
            { label: "Ranking" },
            { label: "Products" },
            { label: "Resources" },
          ].map((item) => (
            <li
              key={item.label}
              className="flex cursor-pointer items-center gap-1 hover:text-sky-400"
            >
              {item.label}
              <ChevronDown className="h-4 w-4" />
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div className="ml-auto" />

        {/* Right-side controls */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          {/* AQI Standard */}
          <button className="flex items-center gap-1 hover:text-sky-400">
            <img
              src="/flag-us.svg"
              alt="flag"
              className="h-5 w-5 rounded-[2px]"
            />
            AQI-US
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Language selector */}
          <button className="flex items-center gap-1 hover:text-sky-400">
            <Globe className="h-5 w-5" /> English
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Dark / Light toggle (placeholder) */}
          <button className="flex items-center justify-center rounded-md p-2 hover:bg-slate-700/50">
            <Moon className="h-4 w-4" />
          </button>

          {/* Login */}
          {/* <Button className="flex items-center gap-1 bg-sky-600 hover:bg-sky-700">
            Login <ArrowRight className="h-4 w-4" />
          </Button> */}
        </div>
      </nav>
    </header>
  );
}
