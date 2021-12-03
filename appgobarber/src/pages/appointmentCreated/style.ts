import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
`;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #f4ede8;
    font-size: 32px;
    margin-top: 48px;
    text-align: center;
`;

export const Description = styled.Text`
    font-family: 'RobotoSlab-Regular';
    text-align: center;
    font-size: 18px;
    margin: 16px;
    color: #999591;
`;

export const OkButton = styled.TouchableOpacity`
    background-color: #ff9000;
    height: 56px;
    padding: 12px 24px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const OkButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #3e3b47;
`;
