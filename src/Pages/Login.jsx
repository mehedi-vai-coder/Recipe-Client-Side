import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { auth, AuthContext } from '../Provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';

const Login = () => {
  const [error, setError] = useState("");
  const { CreateLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        navigate(location.state || "/");
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    CreateLogin(email, password)
      .then((result) => {
        navigate(location.state || "/");
        console.log(result.user.email);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-white dark:bg-black transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-2xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">🔐 Login to Your Account</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <a className="text-sm text-indigo-400 hover:underline cursor-pointer">Forgot password?</a>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm">
          Don’t have an account?
          <Link to="/auth/register" className="text-indigo-400 hover:underline ml-1 font-medium">Register</Link>
        </p>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 mt-2 bg-white dark:bg-gray-100 text-black font-semibold rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
