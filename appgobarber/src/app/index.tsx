import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import AuthRoutes from '../routes/index';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from '../hooks';
// import { Container } from './styles';

const app: React.FC = () => (
    <NavigationContainer>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#312e38"
            translucent
        />
        <AppProvider>
            <View style={{ flex: 1, backgroundColor: '#312e38' }}>
                <AuthRoutes />
            </View>
        </AppProvider>
    </NavigationContainer>
);

export default app;
