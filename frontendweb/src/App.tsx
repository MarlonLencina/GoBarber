import React, { useCallback, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ToastContainer from "./components/toastContainer";
import { AuthProvider } from "./hooks/authContext";
import { ToastProvider } from "./hooks/toastContext";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signup";
import RoutesComponent from "./routes";
import GlobalStyle from "./styles/global";


const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <ToastProvider>
                    <RoutesComponent />
                </ToastProvider>
            </AuthProvider>
            <GlobalStyle />
        </Router>
    );
};

export default App;
