// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Search, Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About Us", path: "/about" },
//     { name: "Login", path: "/login" },
//     { name: "SignUp", path: "/signup" },
//     { name: "Contact", path: "/contact" },
//     { name: "Air Quality", path: "/air-quality" },
//     { name: "Blogs", path: "/blogs" },
//     // { name: "Forecast", path: "/forecast" },
//     { name: "Dashboard", path: "/dashboard" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md shadow">
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center text-2xl font-bold tracking-tight text-white"
//         >
//           <span className="text-sky-400">AQ</span>
//           <span className="text-green-400">I</span>
//         </Link>

//         {/* Desktop nav links */}
//         <div className="hidden md:flex items-center gap-6 text-sm text-white">
//           {navLinks.map((link, index) => (
//             <Link
//               key={index}
//               to={link.path}
//               className="hover:text-sky-400 transition-colors"
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile menu toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="text-white"
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile nav menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-slate-900/90 text-white px-4 py-3 space-y-2">
//           {navLinks.map((link, index) => (
//             <Link
//               key={index}
//               to={link.path}
//               onClick={() => setIsMobileMenuOpen(false)} // close on click
//               className="block hover:text-sky-400 transition-colors"
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }

// !With logig of signout
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/user/user.reducer"; // adjust the path as needed

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // accessing user from Redux

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Air Quality", path: "/air-quality" },
    { name: "Blogs", path: "/blogs" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const handleSignOut = () => {
    dispatch(userLogout());
  };

  const authLinks = user
    ? [{ name: "Sign Out", action: handleSignOut }]
    : [
        { name: "Login", path: "/login" },
        { name: "SignUp", path: "/signup" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold tracking-tight text-white"
        >
          <span className="text-sky-400">AQ</span>
          <span className="text-green-400">I</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white">
          {commonLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="hover:text-sky-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {authLinks.map((link, index) =>
            link.path ? (
              <Link
                key={`auth-${index}`}
                to={link.path}
                className="hover:text-sky-400 transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={`auth-${index}`}
                onClick={link.action}
                className="hover:text-sky-400 transition-colors"
              >
                {link.name}
              </button>
            )
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/90 text-white px-4 py-3 space-y-2">
          {[...commonLinks, ...authLinks].map((link, index) =>
            link.path ? (
              <Link
                key={`mobile-${index}`}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-sky-400 transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={`mobile-${index}`}
                onClick={() => {
                  link.action();
                  setIsMobileMenuOpen(false);
                }}
                className="block text-left w-full hover:text-sky-400 transition-colors"
              >
                {link.name}
              </button>
            )
          )}
        </div>
      )}
    </header>
  );
}
