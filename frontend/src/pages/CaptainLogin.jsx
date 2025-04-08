import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car } from "lucide-react";
import axios from "axios";
import { CaptainDataContext } from "../Context/CaptainContext";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleCaptainLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/login`,
        loginData
      );

      // If login successful and token exists
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setCaptain(response.data.captain || {}); // adjust if your backend returns captain details
        navigate("/CaptainHome");
      } else {
        console.error("Login failed: Token not received.");
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }

    // Clear the form
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center px-4 text-white">
      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Car size={28} className="text-white" />
        <span className="text-2xl font-bold tracking-tight">Uber Captain</span>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleCaptainLogin}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl space-y-5"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-1">Captain Login</h2>
          <p className="text-gray-400">Log in to start accepting rides</p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="captain@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-[1.02]"
        >
          Login as Captain
        </button>

        {/* Sign in as User */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">Not a Captain?</p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition duration-300"
          >
            Sign in as User
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/captain-signup" className="text-blue-400 hover:underline">
            Sign up as Captain
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CaptainLogin;
