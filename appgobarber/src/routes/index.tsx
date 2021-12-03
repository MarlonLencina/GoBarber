import AuthRoutes from './auth.routes';
import React from 'react';
import { useAuth } from '../hooks/authContext';
import AppRoutes from './app.routes';
import { ActivityIndicator, View } from 'react-native';

const Routes: React.FC = () => {
    const { user, loading } = useAuth();
    console.log(user);
    console.log(loading);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#ff9000" />
            </View>
        );
    }
    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
