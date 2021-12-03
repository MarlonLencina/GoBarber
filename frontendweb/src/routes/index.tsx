import React from "react";
import { Switch } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import forgotPassword from "../pages/forgotPassword";
import Profile from "../pages/profile";
import resetPassword from "../pages/resetPassword";
import SignIn from "../pages/signIn";
import signup from "../pages/signup";
import Route from "./routes";

const RoutesComponent: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={signup} />
            <Route path="/forgotPassword" component={forgotPassword} />
            <Route path="/reset-password" component={resetPassword} />
            <Route path="/dashboard" isPrivate component={Dashboard} />
            <Route path="/profile" isPrivate component={Profile} />
        </Switch>
    );
};

export default RoutesComponent;
