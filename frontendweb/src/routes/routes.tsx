import React from "react";
import {
    RouteProps as ReactDOMprops,
    Route as ReactDOMroute,
    Redirect,
} from "react-router-dom";

import { useAuth } from "../hooks/authContext";

interface RouteProps extends ReactDOMprops {
    isPrivate?: boolean;
    component: React.ComponentType;
}

// import { Container } from './styles';

const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();
    console.log(user);
    return (
        <ReactDOMroute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? "/" : "dashboard",
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default Route;
