import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car } from "lucide-react";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user,setUser}=useContext(UserDataContext)


  const handleUserLogin =async (e) => {
    e.preventDefault();
    // TODO: Add login logic using email and password
    const userData={
      email:email,
      password:password
    }
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`,userData)
    if(response.status==200){
      const data=response.data
      localStorage.setItem('token',data.token)
      setUser(data.user)
      navigate('/UserHome')
    }
    setEmail('')
    setPassword('')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center px-4 text-white">
      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Car size={28} className="text-white" />
        <span className="text-2xl font-bold tracking-tight">Uber</span>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleUserLogin}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl space-y-5"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-1">User Login</h2>
          <p className="text-gray-400">Log in to request your next ride</p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="user@example.com"
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
          Login as User
        </button>

        {/* Sign in as Captain */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">Are you a Captain?</p>
          <button
            type="button"
            onClick={() => navigate("/captain-login")}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition duration-300"
          >
            Sign in as Captain
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
