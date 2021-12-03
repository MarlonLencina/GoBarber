import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/clientAPI';

interface signinCredentials {
    email: string;
    password: string;
}

interface IUserData {
    name: string;
    email: string;
    avatar_url: string;
}

interface IauthContext {
    signin(credentials: signinCredentials): Promise<void>;
    signOut(): void;
    user: IUserData;
    loading: Boolean;
}

const AuthContext = createContext<IauthContext>({} as IauthContext);

interface AuthState {
    token: string;
    user: IUserData;
}

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStorageData = async (): Promise<void> => {
            const [Token, User] = await AsyncStorage.multiGet([
                '@gobarber:token',
                '@gobarber:user',
            ]);
            if (Token[1] && User[1]) {
                setData({ token: Token[1], user: JSON.parse(User[1]) });
                api.defaults.headers.common.authorization = `Bearer ${Token[1]}`;
            }

            setLoading(false);
        };

        loadStorageData();
    }, []);

    const signin = useCallback(async ({ email, password }) => {
        try {
            const response = await api.post('/sessions', {
                email,
                password,
            });

            console.log(response);

            const { token, user } = response.data;

            await AsyncStorage.multiSet([
                ['@gobarber:token', token],
                ['@gobarber:token', JSON.stringify(user)],
            ]);

            setData({ token, user });

            api.defaults.headers.common.authorization = `Bearer ${token}`;
        } catch (error) {
            throw Error;
        }
    }, []);

    const signOut = useCallback(() => {
        AsyncStorage.multiRemove(['@gobarber:token', '@gobarber:token']);

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: data.user, signin, signOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): IauthContext => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('use auth must be used within a provider');
    }

    return context;
};

export { AuthContext, AuthProvider, useAuth };
