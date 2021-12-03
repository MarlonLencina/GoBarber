import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IProviderData } from '../dashboard';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProviderContainerList {
    selected: boolean;
}

interface IProviderName {
    selected: boolean;
}

interface IHourProps {
    available: boolean;
    selected: boolean;
}

interface IHourTextProps {
    selected: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
    padding: 24px;
    background-color: #28262e;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
    margin-right: auto;
    margin-left: 16px;
`;

export const UserAvatar = styled.Image`
    height: 56px;
    width: 56px;
    border-radius: 28px;
`;

export const ProvidersList = styled(
    FlatList as new () => FlatList<IProviderData>,
)`
    padding: 32px 24px;
`;

export const ProvidersListContainer = styled.View`
    height: 112px;
`;

export const ProviderContainer = styled.TouchableOpacity<IProviderContainerList>`
    background-color: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
    flex-direction: row;
    align-items: center;
    margin-right: 16px;
    border-radius: 10px;
    padding: 12px 16px;
`;

export const ProviderAvatar = styled.Image`
    height: 40px;
    width: 40px;
    border-radius: 20px;
`;

export const ProviderName = styled.Text<IProviderName>`
    margin-left: 8px;
    font-size: 16px;
    color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
    font-family: 'RobotoSlab-Medium';
`;

export const CalendarContainer = styled.View``;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #f4ede8;
    font-size: 24px;
    margin: 0 24px 24px;
`;

export const ButtonDatePickerHandle = styled.TouchableOpacity`
    background-color: #ff9000;
    height: 56px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
`;
export const ButtonDatePickerText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #232129;
    font-size: 16px;
`;

export const Schedule = styled.View`
    padding: 24px 0 16px;
`;

export const Section = styled.View`
    margin-bottom: 16px;
`;

export const SectionTitle = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #999591;
    font-size: 16px;
    margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 24 },
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled.TouchableOpacity<IHourProps>`
    padding: 12px;
    background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
    border-radius: 10px;
    margin-right: 8px;
    opacity: ${(props) => (props.available ? 1 : 0.5)};
`;

export const HourText = styled.Text<IHourTextProps>`
    color: ${(props) => (props.selected ? '#3e3b47' : '#f4ede8')};
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
`;

export const CreateAppointmentButton = styled.TouchableOpacity`
    background-color: #ff9000;
    height: 56px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
`;
export const CreateAppointmentButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #232129;
    font-size: 18px;
`;
