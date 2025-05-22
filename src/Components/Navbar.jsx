import React from 'react';
import { Link, NavLink } from 'react-router';
import user from '../assets/user.png'
import icon from '../assets/restaurant-service-abstract-logo-template-symbol-icon-free-vector.jpg'
const Navbar = () => {
    return (
        <div className='flex justify-between items-center'>
            <div className="">
                <img className='w-15' src={icon} alt="" />
            </div>
            <div className="nav flex gap-5 lg:ml-60 ">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/allrecipe'>All Recipes</NavLink>
                <NavLink to='/addrecipe'>Add Recipe</NavLink>
                <NavLink to='/myrecipe'>My Recipes</NavLink>
            </div>
            <div className="login-btn flex gap-3">
                <img src={user} alt="" />
                <Link to='/auth/register' className='btn btn-primary px-8'>Register</Link>
                <Link to='/auth/login' className='btn btn-primary px-8'>Login</Link>
            </div>
        </div>
    );
};

export default Navbar;