import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { toast } from "react-hot-toast";
import { signUp } from "../../redux/user/user.action";
import { clearError } from "../../redux/user/user.reducer";

function CitizenSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isSigning, setIsSigning] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordMatch(true);

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setIsSigning(true);

    const userData = {
      name,
      email,
      password,
    };

    dispatch(signUp(userData));
  };

  useEffect(() => {
    if (user && user.user) {
      toast.success("Registration Successful");
      setIsSigning(false);
      navigate("/");
    } else if (user && user.error) {
      toast.error(user.error || "Something went wrong");
      setIsSigning(false);
      dispatch(clearError());
    }
  }, [user, dispatch, navigate]);
  document.body.onkeydown = function (e) {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="py-2 px-3 rounded bg-white text-black focus:outline-none"
              required
            />

            <div className="flex items-center bg-white text-black rounded overflow-hidden">
              <span className="px-2">
                <MdEmail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-grow py-2 px-3 focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center bg-white text-black rounded overflow-hidden">
              <span className="px-2">
                <GrSecure />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="flex-grow py-2 px-3 focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center bg-white text-black rounded overflow-hidden">
              <span className="px-2">
                <GrSecure />
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="flex-grow py-2 px-3 focus:outline-none"
                required
              />
            </div>

            {!passwordMatch && (
              <small className="text-red-400 text-sm">
                * Passwords do not match
              </small>
            )}

            <button
              type="submit"
              disabled={isSigning}
              className={`py-2 rounded-full bg-sky-500 text-white font-semibold transition-all ${
                isSigning ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-600"
              }`}
            >
              {isSigning ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-400 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default  CitizenSignUp;
