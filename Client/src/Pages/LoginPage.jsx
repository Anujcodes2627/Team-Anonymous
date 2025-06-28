import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/user.action";
import { clearError } from "../redux/user/user.reducer";
import { toast } from "react-hot-toast";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSigning(true);
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user && user.user) {
      toast.success("Logged In Successfully");
      setIsSigning(false);
      navigate("/");
    } else if (user && user.error) {
      toast.error(user.error || "Invalid Credentials"); // ✅ FIXED
      setIsSigning(false);
      dispatch(clearError());
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex items-center bg-white text-black rounded overflow-hidden">
              <span className="px-2">
                <MdEmail />
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="flex-grow py-2 px-3 focus:outline-none"
              />
            </div>

            <div className="flex items-center bg-white text-black rounded overflow-hidden">
              <span className="px-2">
                <GrSecure />
              </span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="flex-grow py-2 px-3 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSigning}
              className={`py-2 rounded-full bg-sky-500 text-white font-semibold transition-all ${
                isSigning ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-600"
              }`}
            >
              {isSigning ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-300">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-sky-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
