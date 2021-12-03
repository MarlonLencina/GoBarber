import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background-color: #ff9600;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 8px;
`;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312e38;
    font-size: 16px;
`;
