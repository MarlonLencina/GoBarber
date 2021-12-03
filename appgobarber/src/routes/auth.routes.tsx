import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import signin from '../pages/signin';
import signup from '../pages/signup';

const Auth = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <>
            <Auth.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#312e38' },
                    statusBarStyle: 'auto',
                }}
            >
                <Auth.Screen name="SignIn" component={signin} />
                <Auth.Screen name="SignUp" component={signup} />
            </Auth.Navigator>
        </>
    );
};

export default AuthRoutes;
