import React, { useContext } from 'react';
import {Route, Redirect, useLocation} from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

export const ProtectedRoute = ({ component: Component, path: path, ...props }) => {
    const value = useContext(AppContext);
    const location = useLocation();

    return (
        <Route>
            {() => (value.loggedIn || location.pathname === path ? <Component {...props} /> : <Redirect to="/" />)}
        </Route>
    );
};
