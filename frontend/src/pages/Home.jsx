import React from "react";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-between p-6 text-white font-sans">
      {/* Header / Logo */}
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto pt-4">
        <div className="flex items-center gap-2">
          <Car size={28} className="text-white" />
          <span className="text-2xl font-bold tracking-tight">Uber</span>
        </div>
        <Link
          to="/login"
          className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Login
        </Link>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center justify-center text-center flex-1 px-4 animate-fadeIn">
        <Car size={100} className="text-white mb-6 animate-float-slow" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Ride, Your Way</h1>
        <p className="text-gray-300 max-w-xl">
          Seamless, safe and reliable transportation at your fingertips.
        </p>
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-sm">
        <Link
          to="/login"
          className="block w-full text-center bg-white text-black py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300"
        >
          Get Started
        </Link>
        <p className="text-center text-sm text-gray-400 mt-2">
          New here?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
