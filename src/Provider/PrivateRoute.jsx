import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
import { AuthContext } from './AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user, loading, } = use(AuthContext)
    const location = useLocation()

   
    // return user ? children : <Navigate to="/login" />;

    if (loading) {
        return <Loading></Loading>;
    }
    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default PrivateRoute;