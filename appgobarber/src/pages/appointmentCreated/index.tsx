import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Container, Title, Description, OkButton, OkButtonText } from './style';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
const AppointmentCreated: React.FC = () => {
    const { reset } = useNavigation();
    const { params } = useRoute();
    const routeParamsDate = params;
    const formatDate = useMemo(() => {
        return format(
            routeParamsDate,
            "EEE', dia 'dd' de 'MMMM' de 'yyyy' ás 'HH:mm",
            {
                locale: ptBR,
            },
        );
    }, []);
    const handleOkPress = useCallback(() => {
        reset({
            routes: [{ name: 'Dashboard' }],
            index: 0,
        });
    }, []);
    return (
        <Container>
            <Icon name="check" size={80} color={'#04d361'}></Icon>
            <Title>Agendamento Concluido</Title>
            <Description>{formatDate}</Description>
            <OkButton
                onPress={() => {
                    handleOkPress();
                }}
            >
                <OkButtonText>OK</OkButtonText>
            </OkButton>
        </Container>
    );
};

export default AppointmentCreated;
