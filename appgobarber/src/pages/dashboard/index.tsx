import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from 'react-native';
import { View } from 'react-native';
import { useAuth } from '../../hooks/authContext';
import ButtonComponent from '../../components/button';
import {
    Container,
    Header,
    HeaderTitle,
    Username,
    ProfileButton,
    UserAvatar,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText,
    ProviderListTitle,
} from './style';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/clientAPI';

export interface IProviderData {
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    const { navigate } = useNavigation();
    const [providers, setProviders] = useState<IProviderData[]>([]);
    const navigateToProfile = useCallback(() => {
        navigate('Profile');
    }, [navigate]);

    useEffect(() => {
        api.get('providers').then((res) => {
            setProviders(res.data.providers);
        });
    }, [setProviders]);

    const HandleClickProvider = useCallback(
        ({ id }: IProviderData) => {
            navigate('CreateAppointment', id);
        },
        [navigate],
    );

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo,{'\n'}
                    <Username>{user.name}</Username>
                </HeaderTitle>
                <ProfileButton onPress={navigateToProfile}>
                    <UserAvatar source={{ uri: user.avatar_url }}></UserAvatar>
                </ProfileButton>
            </Header>
            <ProvidersList
                data={providers}
                keyExtractor={(provider) => provider.id}
                ListHeaderComponent={
                    <ProviderListTitle>Cabelereiros</ProviderListTitle>
                }
                renderItem={({ item: provider }) => (
                    <ProviderContainer
                        onPress={() => {
                            HandleClickProvider(provider);
                        }}
                    >
                        <ProviderAvatar
                            source={{ uri: provider.avatar_url }}
                        ></ProviderAvatar>
                        <ProviderInfo>
                            <ProviderName>{provider.name}</ProviderName>

                            <ProviderMeta>
                                <Icon
                                    name="calendar"
                                    size={14}
                                    color="#ff9000"
                                />
                                <ProviderMetaText>
                                    Segunda a Sexta
                                </ProviderMetaText>
                            </ProviderMeta>
                            <ProviderMeta>
                                <Icon
                                    name="calendar"
                                    size={14}
                                    color="#ff9000"
                                />
                                <ProviderMetaText>
                                    Segunda a Sexta
                                </ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                )}
            />
        </Container>
    );
};

export default Dashboard;
