import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #faede8;
    font-family: 'RobotoSlab-Medium';
    margin-bottom: 20px;
    margin-top: 40px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
    margin-top: 24px;
`;
export const ForgotPasswordText = styled.Text`
    color: #f4ede8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #312e38;
    border-color: #232129;
    border-top-width: 1px;
    padding: 16px 0 ${16 + getBottomSpace()}px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CreateAccountText = styled.Text`
    color: #ff9000;
    font-size: 16px;
    font-family: 'RobotoSlab-Medium';
    margin-left: 16px;
`;
