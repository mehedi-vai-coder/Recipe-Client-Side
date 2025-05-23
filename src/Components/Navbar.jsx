import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import userProfile from '../assets/user.png'
import icon from '../assets/food-icon-background-png-favpng-LpukJ2X1XZ54jEJfA0YyfnFZ2.jpg'
import { AuthContext } from '../Provider/AuthProvider';
import DarkWhiteToggler from './DarkWhiteToggler';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);
    const handleLogout = () => {
        logOut().then(() => {
            alert("You logged Out Successfully")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='flex justify-between items-center
        text-black dark:text-white  bg-white dark:bg-black'>
            <div className="flex justify-center items-center gap-4">
                <img className='w-15' src={icon} alt="" />
                <h1 className='text-2xl font-black'>RECIPE BOOK</h1>
            </div>
            <div className="nav flex gap-5 lg:ml-50 text-xl">
                <NavLink className='nav_text' to='/'>Home</NavLink>
                <NavLink className='nav_text' to='/allrecipe'>All Recipes</NavLink>
                <NavLink className='nav_text' to='/addrecipe'>Add Recipe</NavLink>
                <NavLink className='nav_text' to='/myrecipe'>My Recipes</NavLink>
            </div>
            <div className="login-btn flex gap-5">
                <img className="w-12 rounded-full" src={`${user ? user.photoURL
                    : userProfile}`} alt="" />
                {
                    user ? <button onClick={handleLogout} className="btn btn-primary px-10 " >Logout</button> : <Link to='/auth/login' className="btn btn-primary px-10 ">Login</Link>
                }
                {
                    user ? '' : <Link to='/auth/register' className="btn btn-primary px-10 ">Register</Link>
                }
                <div>
                    <DarkWhiteToggler></DarkWhiteToggler>
                </div>

            </div>
        </div>
    );
};

export default Navbar;