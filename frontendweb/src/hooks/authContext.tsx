import { createContext, useCallback, useContext, useState } from "react";

import api from "../services/clientAPI";

interface signinCredentials {
    email: string;
    password: string;
}

interface credentialsSendForgotPassword {
    email: string;
}

interface credentialsRecoverPassword {
    token: string;
    password: string;
    passwordConfirmation: string;
}

interface iUserData {
    name: string;
    email: string;
    id: string;
    avatar_url: string;
}

interface IauthContext {
    signin(credentials: signinCredentials): Promise<void>;
    sendForgotPasswordRequest(
        credentialsEmail: credentialsSendForgotPassword
    ): Promise<void>;
    user: iUserData;
    token: string;
    resetPassword(
        credentialsPassword: credentialsRecoverPassword
    ): Promise<void>;
    signOut(): void;
    updateUser(user: iUserData): void;
}

const AuthContext = createContext<IauthContext>({} as IauthContext);

interface AuthState {
    token: string;
    user: iUserData;
}

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@gobarber:token");
        const user = localStorage.getItem("@gobarber:user");

        if (token && user) {
            api.defaults.headers.common.Authorization = token;
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const sendForgotPasswordRequest = useCallback(
        async ({ email }: credentialsSendForgotPassword): Promise<void> => {
            await api.post("password/forgot", {
                email,
            });
        },
        []
    );

    const resetPassword = useCallback(
        async ({ token, password, passwordConfirmation }) => {
            try {
                const response = await api.post("password/reset", {
                    token,
                    password,
                    password_confirmation: passwordConfirmation,
                });

                console.log(response);
            } catch (error) {
                throw Error;
            }
        },
        []
    );

    const signin = useCallback(async ({ email, password }) => {
        try {
            const response = await api.post("/sessions", {
                email,
                password,
            });

            console.log(response);

            const { token, user } = response.data;
            localStorage.setItem("@gobarber:token", token);
            localStorage.setItem("@gobarber:user", JSON.stringify(user));

            setData({ token, user });
            api.defaults.headers.common.Authorization = token;
        } catch (error) {
            throw Error;
        }
    }, []);

    const updateUser = useCallback((user: iUserData) => {
        setData({
            token: data.token,
            user,
        });
        localStorage.setItem("@gobarber:user", JSON.stringify(data.user));
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@gobarber:token");
        localStorage.removeItem("@gobarber:token");

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signin,
                sendForgotPasswordRequest,
                resetPassword,
                signOut,
                token: data.token,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): IauthContext => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("use auth must be used within a provider");
    }

    return context;
};

export { AuthContext, AuthProvider, useAuth };
