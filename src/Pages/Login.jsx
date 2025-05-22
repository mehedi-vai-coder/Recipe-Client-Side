import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { auth, AuthContext } from '../Provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [error, setError] = useState("")
  // console.log(error)
  const { CreateLogin } = use(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
   const provider = new GoogleAuthProvider;
  //  console.log(location)
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                navigate(`${location.state ? location.state : "/"}`)
                console.log(result)
            }).then(error => {
                console.log(error)
            })
    }

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    // console.log(email,password)

    CreateLogin(email, password)
      .then((result) => {
        const user = result.user
        navigate(`${location.state ? location.state : "/"}`)
        console.log(user)
      })
      .catch((error) => {
        const errormasses = error.message
        setError(errormasses)
        //  console.log(errormasses)

      })
  }
  return (
    <div className='flex justify-center items-center mt-40'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h1 className='font-bold text-2xl text-center'>Login Your Account</h1>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input type="email" name='email' className="input" placeholder="Email" required />
            {/* passeword */}
            <label className="label">Password</label>
            <input type="password" name='password' className="input" placeholder="Password" required />
            <div><a className="link link-hover">Forgot password?</a></div>
            {
              error && <p className='text-red-500'> {error} </p>
            }

            <button type='submit' className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <p className='text-center font-semibold'>Don't Have an account? <Link className='text-blue-400' to='/auth/register'>Register</Link></p>
        </form>
         <button navigate="/blog"  onClick={handleGoogleSignIn} className="btn btn-link mt-4">Sign In With Google</button>
      </div>
    </div>
  );
};

export default Login;