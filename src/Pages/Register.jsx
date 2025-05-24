import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { auth, AuthContext } from '../Provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Register = () => {
    const { createUser, setUser, updateUser } = use(AuthContext)
    const [nameError, setNameError] = useState();
    const [validPass, setValidPass] = useState('');
    const provider = new GoogleAuthProvider;
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                navigate(`${location.state ? location.state : "/"}`)
                console.log(result)
            }).then(error => {
                console.log(error)
            })
    }
    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        if (name.length < 5) {
            setNameError("Name should be more then 5 character")
            return;
        } else {
            setNameError("")
        }
        const email = e.target.email.value
        const password = e.target.password.value
        if (password.length < 6) {
            setValidPass("Password should be more than 6 character")
            return;
        } else {
            setValidPass('');
        }
        if (!/[A-Z]/.test(password)) {
            setValidPass("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setValidPass("Password must contain at least one lowercase letter.");
            return;
        }
        const photourl = e.target.photourl.value
        createUser(email, password)
            .then(result => {
                const user = result.user
                   navigate(`${location.state ? location.state : "/"}`)
                updateUser({ displayName: name, photoURL: photourl })
                    .then(() => {

                        setUser({ ...user, displayName: name, photoURL: photourl })
                    }).catch((error) => {
                        console.log(error)
                        setUser(user);
                    })
            })
            .catch(error => {
                console.log(error.masses)
            })
        //  console.log(name,email,password,photourl)
    }
    return (
        <div className='flex justify-center items-center mt-40'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h1 className='font-bold text-2xl text-center'>Register Your Account</h1>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" required />
                        {
                            nameError && <p className='text-red-600'>{nameError}</p>
                        }
                        {/* Photo Url */}
                        <label className="label">Photo Url</label>
                        <input type="text" name='photourl' className="input" placeholder="Photo URL" required />

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required />

                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" required />
                        {
                            validPass && <p className='text-red-600'>{validPass}</p>
                        }
                        <button type='submit' className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                    <p className='text-center font-semibold'>Already Have an account? {" "}
                        <Link className='text-blue-400' to='/auth/login'>Login</Link></p>
                </form>
                <button onClick={handleGoogleSignIn} className="btn btn-link mt-4">Sign In With Google</button>
            </div>
        </div>
    );
};

export default Register;