import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { auth, AuthContext } from '../Provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
    const { createUser, setUser, updateUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState('');
    const [validPass, setValidPass] = useState('');
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                toast.success("Google sign in successful!");
                navigate('/');
            })
            .catch(error => {
                toast.error("Google sign in failed.");
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photourl = e.target.photourl.value;

        // Name validation
        if (name.length < 5) {
            setNameError("Name should be more than 5 characters.");
            return;
        } else {
            setNameError("");
        }

        // Password validation
        if (password.length < 6) {
            setValidPass("Password should be more than 6 characters.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setValidPass("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setValidPass("Password must contain at least one lowercase letter.");
            return;
        }
        setValidPass("");

        // Registering
        createUser(email, password)
            .then(result => {
                updateUser({ displayName: name, photoURL: photourl })
                    .then(() => {
                        setUser({ ...result.user, displayName: name, photoURL: photourl });
                        toast.success("Registration successful!");
                        navigate('/');
                    })
                    .catch((error) => {
                        setUser(result.user);
                        toast("Profile updated failed but registered.", { icon: "⚠️" });
                    });
            })
            .catch(error => {
                toast.error("Registration failed. Please try again.");
                console.error(error.message);
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
                <h1 className="text-3xl font-bold text-center">📝 Register Your Account</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your full name"
                            required
                        />
                        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-1 font-medium">Photo URL</label>
                        <input
                            type="text"
                            name="photourl"
                            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Link to your photo"
                            required
                        />
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Create a password"
                            required
                        />
                        {validPass && <p className="text-red-500 text-sm">{validPass}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm">
                    Already have an account?
                    <Link to="/auth/login" className="text-indigo-400 hover:underline ml-1 font-medium">Login</Link>
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

export default Register;
