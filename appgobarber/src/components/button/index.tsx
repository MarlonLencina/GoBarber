import React, { Children } from 'react';
import { Text } from 'react-native';
import { Container, Title } from './styles';
import { RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
    children: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <Container {...rest}>
            <Title>{children}</Title>
        </Container>
    );
};

export default ButtonComponent;
