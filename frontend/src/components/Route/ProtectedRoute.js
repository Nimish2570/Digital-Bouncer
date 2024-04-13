import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    return (
        <Fragment>
            {!loading && (
                <Route
                    {...rest}
                    render={props => {
                        if (!isAuthenticated) {
                            // Use window.location for programmatic navigation
                            window.location.href = '/login';
                            return null; // or any loading component if you want
                        }
                        return <Component {...props} />;
                    }}
                />
            )}
        </Fragment>
    );
};

export default ProtectedRoute;
