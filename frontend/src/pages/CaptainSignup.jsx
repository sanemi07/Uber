import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car } from "lucide-react";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCaptainSignup = (e) => {
    e.preventDefault();
    const newCaptain = { firstName, lastName, email, password };
    console.log("Signing up Captain:", newCaptain);
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
        <span className="text-2xl font-bold tracking-tight">Uber Captain</span>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-4 pt-28">
        <form
          onSubmit={handleCaptainSignup}
          className="w-full max-w-lg bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl space-y-5"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-1">Captain Signup</h2>
            <p className="text-gray-400">Join the Uber Captain network</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                required
                placeholder="Arjun"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                required
                placeholder="Tripathi"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="captain@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-full transition duration-300"
          >
            Sign up as Captain
          </button>

          <div className="text-center mt-3">
            <p className="text-sm text-gray-400">Not a Captain?</p>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="mt-2 w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Sign up as User
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-3">
            Already have an account?{" "}
            <Link to="/Captain-login" className="text-green-400 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
