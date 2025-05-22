import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from "firebase/auth";

export const AuthContext = createContext();
export const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] =useState(true)
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const CreateLogin = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
       const handleGoogleSignIn =(provider) => {
        return signInWithPopup(auth,provider)
    }
   
    const logOut =() =>{
        return signOut(auth);
    }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])
    const authData = {
        user,
        setUser,
        createUser,
        CreateLogin,
        logOut,
        loading,
        setLoading,
        handleGoogleSignIn
    }
    return <AuthContext value={authData}>{children}</AuthContext>
};


export default AuthProvider;