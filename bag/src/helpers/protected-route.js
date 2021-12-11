//Creating a protected route to stop an unauthorized user to access the app

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children, ...rest }) {
    return (
        /* We create the route and add to check if there's a user logged in*/
        <Route
            {...rest}
            render={({location}) => {
                if (user) { // if the user is present render the desired route component 
                    return children;
                }
                
                if (!user) { // if there's no user, redirect the user back to login
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                            }}
                        />
                    );
                }
                
                return null;
            }}
        />
    );
}