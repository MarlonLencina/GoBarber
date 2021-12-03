import styled from 'styled-components/native';
import { IProviderData } from '.';
import { FlatList } from 'react-native';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    padding: 24px;
    background-color: #28262e;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Regular';
`;

export const Username = styled.Text`
    color: #ff9000;
    font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;
export const UserAvatar = styled.Image`
    height: 56px;
    width: 56px;
    border-radius: 28px;
`;

export const ProvidersList = styled(
    FlatList as new () => FlatList<IProviderData>,
)`
    color: #ff9000;
    padding: 32px 24px 16px;
`;

export const ProviderContainer = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #3b3e47;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 16px;
    align-items: center;
`;

export const ProviderAvatar = styled.Image`
    height: 72px;
    width: 72px;
    border-radius: 36px;
`;

export const ProviderInfo = styled.View`
    flex: 1;
    margin-left: 16px;
`;

export const ProviderName = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #f4ede8;
`;

export const ProviderMeta = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
    margin-left: 8px;
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    color: #999591;
`;

export const ProviderListTitle = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    margin-bottom: 24px;
    font-family: 'RobotoSlab-Medium';
`;
