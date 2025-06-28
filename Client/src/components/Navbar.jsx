
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/user/user.reducer";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const signupOptions = [
    { name: "Citizen SignUp", path: "/signup/citizen" },
    { name: "Organization SignUp", path: "/signup/organization" },
    { name: "Policymaker SignUp", path: "/signup/policymaker" },
  ];

  const handleSignOut = () => {
    dispatch(userLogout());
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold tracking-tight text-white"
        >
          <span className="text-sky-400">Eco</span>
          <span className="text-green-400">Scope</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white relative">
          {commonLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="hover:text-sky-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-sky-400 transition-colors">
                Login
              </Link>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsSignupDropdownOpen(!isSignupDropdownOpen)
                  }
                  className="hover:text-sky-400 transition-colors"
                >
                  SignUp
                </button>
                {isSignupDropdownOpen && (
                  <div className="absolute top-full mt-2 w-56 bg-slate-800 text-white rounded shadow-lg py-2 z-20">
                    {signupOptions.map((option, i) => (
                      <Link
                        key={i}
                        to={option.path}
                        className="block px-4 py-2 hover:bg-slate-700"
                        onClick={() => setIsSignupDropdownOpen(false)}
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="hover:text-sky-400 transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/90 text-white px-4 py-3 space-y-2">
          {commonLinks.map((link, index) => (
            <Link
              key={`mobile-common-${index}`}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-sky-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-sky-400 transition-colors"
              >
                Login
              </Link>
              {signupOptions.map((option, index) => (
                <Link
                  key={`mobile-signup-${index}`}
                  to={option.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-sky-400 transition-colors"
                >
                  {option.name}
                </Link>
              ))}
            </>
          ) : (
            <button
              onClick={() => {
                handleSignOut();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left hover:text-sky-400 transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
      