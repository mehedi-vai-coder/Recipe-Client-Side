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
            .then(() => alert('You logged out successfully!'))
            .catch((error) => console.error(error));
    };

    const closeMenu = () => setMenuOpen(false);

    const navItems = (
        <>
            <NavLink to="/" onClick={closeMenu} className="hover:text-primary transition font-medium">
                Home
            </NavLink>
            <NavLink to="/allrecipe" onClick={closeMenu} className="hover:text-primary transition font-medium">
                All Recipes
            </NavLink>
            <NavLink to="/addrecipe" onClick={closeMenu} className="hover:text-primary transition font-medium">
                Add Recipe
            </NavLink>
            <NavLink to="/myrecipe" onClick={closeMenu} className="hover:text-primary transition font-medium">
                My Recipes
            </NavLink>
        </>
    );

    return (
        <header className="bg-white dark:bg-black  sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={icon} alt="App Icon" className="w-10 h-10 rounded-full object-cover" />
                    <span className="text-xl font-bold text-black dark:text-white">RECIPE BOOK</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex gap-6 text-black dark:text-white">
                    {navItems}
                </nav>

                {/* Desktop Buttons */}
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

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 ${
                    menuOpen ? 'max-h-screen px-4 pb-4' : 'max-h-0 overflow-hidden'
                }`}
            >
                <div className="flex flex-col gap-4 text-black dark:text-white">
                    {navItems}
                    {user ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                closeMenu();
                            }}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/auth/login"
                                onClick={closeMenu}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                onClick={closeMenu}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    <DarkWhiteToggler />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
