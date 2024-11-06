import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RouteGuard = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // If not authenticated, redirect to login page
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If the user does not have the required role, redirect to an error page or homepage
        return <Navigate to="/notfound" />;
    }

    // If authenticated and authorized, render the page
    return <Outlet />;
};

export default RouteGuard;
