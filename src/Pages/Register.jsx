import React from 'react';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div className='flex justify-center items-center mt-40'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h1 className='font-bold text-2xl text-center'>Register Your Account</h1>
                <form  className="card-body">
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" required />
                        {/* {
                            nameError && <p className='text-red-600'>{nameError}</p>
                        } */}
                        {/* Photo Url */}
                        <label className="label">Photo Url</label>
                        <input type="text" name='photourl' className="input" placeholder="Photo URL" required />

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required />

                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" required />
                        <button type='submit' className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                    <p className='text-center font-semibold'>Already Have an account? {" "}
                        <Link className='text-blue-400' to='/auth/login'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;