import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car } from "lucide-react";

const UserSignup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserSignup = (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, email, password };
    console.log("Signing up with:", newUser);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative">
      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <Car size={28} className="text-white" />
        <span className="text-2xl font-bold tracking-tight">Uber</span>
      </div>

      {/* Content wrapper with top padding to prevent collision */}
      <div className="flex items-center justify-center px-4 pt-28"> {/* 👈 PT-28 here is key */}
        <form
          onSubmit={handleUserSignup}
          className="w-full max-w-lg bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl space-y-5"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-1">User Signup</h2>
            <p className="text-gray-400">Create your Uber account</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                required
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                required
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-[1.02]"
          >
            Sign up as User
          </button>

          <div className="text-center mt-3">
            <p className="text-sm text-gray-400">Want to be a Captain?</p>
            <button
              type="button"
              onClick={() => navigate("/captain-signup")}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition duration-300"
            >
              Sign up as Captain
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
