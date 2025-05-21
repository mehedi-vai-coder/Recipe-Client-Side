import React from 'react';
import { NavLink } from 'react-router';
import user from '../assets/user.png'
const Navbar = () => {
    return (
        <div className='flex justify-between items-center'>
            <div className=""></div>
            <div className="nav flex gap-5 lg:ml-60 ">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/allrecipe'>All Recipes</NavLink>
                <NavLink to='/addrecipe'>Add Recipe</NavLink>
                <NavLink to='/myrecipe'>My Recipes</NavLink>
            </div>
            <div className="login-btn flex gap-3">
                <img src={user} alt="" />
                <button className='btn btn-primary px-8'>Register</button>
                <button className='btn btn-primary px-8'>Login</button>
            </div>
        </div>
    );
};

export default Navbar;