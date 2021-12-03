import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/dashboard';
import Profile from '../pages/profile';
import CreateAppointment from '../pages/createAppointment';
import AppointmentCreated from '../pages/appointmentCreated';

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <>
            <App.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#312e38' },
                    statusBarStyle: 'auto',
                }}
            >
                <App.Screen name="Dashboard" component={Dashboard} />
                <App.Screen
                    name="CreateAppointment"
                    component={CreateAppointment}
                />
                <App.Screen
                    name="AppointmentCreated"
                    component={AppointmentCreated}
                />

                <App.Screen name="Profile" component={Profile} />
            </App.Navigator>
        </>
    );
};

export default AppRoutes;
