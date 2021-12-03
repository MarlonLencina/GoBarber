import React, { Children } from 'react';

import { AuthProvider } from './authContext';

const AppProvider: React.FC = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
