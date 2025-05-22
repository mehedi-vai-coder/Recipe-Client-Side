import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
         <div className='flex justify-center items-center mt-40'>
         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
            <h1 className='font-bold text-2xl text-center'>Login Your Account</h1>
        <form className="card-body">
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input type="email" name='email' className="input" placeholder="Email" required />
            {/* passeword */}
            <label className="label">Password</label>
            <input type="password" name='password' className="input" placeholder="Password" required />
            <div><a className="link link-hover">Forgot password?</a></div>
             {/* {
              error && <p className='text-red-500'> {error} </p>
             }
               */}
            <button type='submit' className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <p className='text-center font-semibold'>Don't Have an account? <Link className='text-blue-400' to='/auth/register'>Register</Link></p>
        </form>
      </div>
       </div>
    );
};

export default Login;