import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userProfile from '../assets/user.png';
import icon from '../assets/food-icon-background-png-favpng-LpukJ2X1XZ54jEJfA0YyfnFZ2.jpg';
import { AuthContext } from '../Provider/AuthProvider';
import DarkWhiteToggler from './DarkWhiteToggler';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => {
                alert('You logged out successfully!');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const navItems = (
        <>
            <NavLink
                to="/"
                className="hover:text-primary transition font-medium"
            >
                Home
            </NavLink>
            <NavLink
                to="/allrecipe"
                className="hover:text-primary transition font-medium"
            >
                All Recipes
            </NavLink>
            <NavLink
                to="/addrecipe"
                className="hover:text-primary transition font-medium"
            >
                Add Recipe
            </NavLink>
            <NavLink
                to="/myrecipe"
                className="hover:text-primary transition font-medium"
            >
                My Recipes
            </NavLink>
        </>
    );

    return (
        <header className="bg-white dark:bg-black shadow-md py-3 px-5 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={icon} alt="App Icon" className="w-10 h-10 rounded-full object-cover" />
                    <span className="text-xl font-bold text-black dark:text-white">
                        RECIPE BOOK
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-6 text-black dark:text-white">
                    {navItems}
                </nav>

                {/* User & Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <img
                        src={user?.photoURL || userProfile}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/auth/login"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    <DarkWhiteToggler />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-black dark:text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="lg:hidden mt-4 flex flex-col gap-4 text-black dark:text-white px-3">
                    {navItems}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/auth/login"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    <DarkWhiteToggler />
                </div>
            )}
        </header>
    );
};

export default Navbar;
