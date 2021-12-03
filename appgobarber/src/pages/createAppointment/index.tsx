import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Container,
    HeaderTitle,
    Header,
    UserAvatar,
    BackButton,
    ProvidersList,
    ProvidersListContainer,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    CalendarContainer,
    Title,
    ButtonDatePickerHandle,
    ButtonDatePickerText,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
} from './style';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/authContext';
import api from '../../services/clientAPI';
import { IProviderData } from '../dashboard/index';
interface routeParams {
    providerId: string;
}

interface IHourAvailabilityItem {
    available: boolean;
    hour: number;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const providerIdParams = route.params;
    const [hourAvailability, setHourAvailability] = useState<
        IHourAvailabilityItem[]
    >([]);
    const { navigate, goBack } = useNavigation();
    const [providers, setProviders] = useState<IProviderData[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(providerIdParams);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigateBack = useCallback(() => {
        goBack();
    }, []);
    const [selectDate, setSelectDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(0);

    useEffect(() => {
        api.get('providers').then((res) => {
            setProviders(res.data.providers);
        });
    }, [setProviders]);

    const handleSelectProvider = useCallback((providerId) => {
        setSelectedProvider(providerId);
    }, []);

    const handleDatePicker = useCallback(() => {
        setShowDatePicker((state) => !state);
    }, []);

    const handleDateChange = useCallback(
        (event: any, date: Date | undefined) => {
            if (Platform.OS === 'android') {
                setShowDatePicker(false);
            }

            if (date) {
                setSelectDate(date);
                console.log(selectDate);
            }
        },
        [],
    );

    useEffect(() => {
        api.get(`/providers/${selectedProvider}/day-availability`, {
            params: {
                day: selectDate.getDate(),
                month: selectDate.getMonth() + 1,
                year: selectDate.getFullYear(),
            },
        }).then((res) => {
            setHourAvailability(res.data.availability);
        });
    }, [selectDate, selectedProvider, selectedHour]);

    const morningAvailability = useMemo(() => {
        return hourAvailability
            .filter((item) => {
                return item.hour < 12;
            })
            .map(({ hour, available }) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), 'HH:00'),
                };
            });
    }, [hourAvailability]);

    const afternonAvailability = useMemo(() => {
        return hourAvailability
            .filter((item) => {
                return item.hour >= 12;
            })
            .map(({ hour, available }) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), 'HH:00'),
                };
            });
    }, [hourAvailability]);

    const handleSelectHour = useCallback(
        (hour: number) => {
            setSelectedHour(hour);
            api.get(`/providers/${selectedProvider}/day-availability`, {
                params: {
                    day: selectDate.getDate(),
                    month: selectDate.getMonth() + 1,
                    year: selectDate.getFullYear(),
                },
            }).then((res) => {
                setHourAvailability(res.data.availability);
            });
        },
        [setHourAvailability, setSelectedHour],
    );

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectDate);
            date.setHours(selectedHour);
            date.setMinutes(0);

            await api.post('appointments', {
                provider_id: selectedProvider,
                date,
            });

            navigate('AppointmentCreated', date);
        } catch (error) {
            Alert.alert('Ocorreu um erro ao marcar um agendamento');
        }
    }, [navigate, selectDate, selectedHour]);

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={() => {
                        navigateBack();
                    }}
                >
                    <Icon name="chevron-left" size={24} color="#999591"></Icon>
                </BackButton>
                <HeaderTitle>Cabelereiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }}></UserAvatar>
            </Header>
            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={(provider) => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer
                            selected={provider.id === selectedProvider}
                            onPress={() => {
                                handleSelectProvider(provider.id);
                            }}
                        >
                            <ProviderAvatar
                                source={{ uri: provider.avatar_url }}
                            ></ProviderAvatar>
                            <ProviderName
                                selected={provider.id === selectedProvider}
                            >
                                {provider.name}
                            </ProviderName>
                        </ProviderContainer>
                    )}
                ></ProvidersList>
            </ProvidersListContainer>
            <CalendarContainer>
                <Title>Escolha uma data</Title>
                <ButtonDatePickerHandle onPress={handleDatePicker}>
                    <ButtonDatePickerText>Selecionar Data</ButtonDatePickerText>
                </ButtonDatePickerHandle>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectDate}
                        mode="date"
                        display="calendar"
                        onChange={handleDateChange}
                    />
                )}
            </CalendarContainer>
            <Schedule>
                <Title>Escolha Horario</Title>
                <Section>
                    <SectionTitle>Manhã</SectionTitle>
                    <SectionContent>
                        {morningAvailability.map((item) => {
                            return (
                                <Hour
                                    disabled={!item.available}
                                    selected={selectedHour === item.hour}
                                    onPress={() => {
                                        handleSelectHour(item.hour);
                                    }}
                                    available={item.available}
                                    key={item.hour}
                                >
                                    <HourText
                                        selected={selectedHour === item.hour}
                                    >
                                        {item.hourFormatted}
                                    </HourText>
                                </Hour>
                            );
                        })}
                    </SectionContent>
                </Section>
                <Section>
                    <SectionTitle>Tarde</SectionTitle>
                    <SectionContent>
                        {afternonAvailability.map((item) => {
                            return (
                                <Hour
                                    disabled={!item.available}
                                    selected={selectedHour === item.hour}
                                    onPress={() => {
                                        handleSelectHour(item.hour);
                                    }}
                                    available={item.available}
                                    key={item.hour}
                                >
                                    <HourText
                                        selected={selectedHour === item.hour}
                                    >
                                        {item.hourFormatted}
                                    </HourText>
                                </Hour>
                            );
                        })}
                    </SectionContent>
                </Section>
            </Schedule>
            <CreateAppointmentButton onPress={handleCreateAppointment}>
                <CreateAppointmentButtonText>
                    Agendar
                </CreateAppointmentButtonText>
            </CreateAppointmentButton>
        </Container>
    );
};

export default CreateAppointment;
