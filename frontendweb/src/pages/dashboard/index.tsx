import { profile } from "console";
import { format, isAfter, isToday, parseISO } from "date-fns";
import { is } from "date-fns/locale";
import ptBR from "date-fns/locale/pt-BR";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { FiClock, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/authContext";
import api from "../../services/clientAPI";
import logo from "../../styles/img/logo.svg";
import {
    Container,
    Profile,
    Header,
    HeaderContent,
    Appointments,
    Content,
    DateComponent,
    Calendar,
    NextAppointment,
    Section,
    Appointment,
} from "./style";

interface monthAvailabilityItem {
    day: number;
    available: boolean;
}

interface IAppointmentItem {
    id: string;
    date: string;
    hourFormatted: string;
    user: {
        name: string;
        avatar_url: string;
    };
}

// import { Container } from './styles';

const Dashboard: React.FC = () => {
    const [selectDay, setSelectDay] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<
        monthAvailabilityItem[]
    >([]);
    const { user, signOut, token } = useAuth();
    const [appointments, setAppointments] = useState<IAppointmentItem[]>([]);

    const handleDateChange = useCallback(
        (day: Date, modifiers: DayModifiers) => {
            if (modifiers.available && !modifiers.disabled) {
                setSelectDay(day);
            }
        },
        []
    );

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        api.get(`providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            },
        }).then((res) => setMonthAvailability(res.data.availability));
    }, [currentMonth, user.id]);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter((monthDay) => monthDay.available === false)
            .map((monthDay) => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();

                return new Date(year, month, monthDay.day);
            });

        return dates;
    }, [currentMonth, monthAvailability]);

    const selectDateAsText = useMemo(() => {
        return format(selectDay, "'Dia' dd 'do' MM", {
            locale: ptBR,
        });
    }, [selectDay]);

    useEffect(() => {
        api.get("/appointments/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                day: selectDay.getDate(),
                month: selectDay.getMonth() + 1,
                year: selectDay.getFullYear(),
            },
        }).then((res) => {
            const appointmentsFormatted = res.data.providers.map(
                (appointment: IAppointmentItem) => {
                    return {
                        ...appointment,
                        hourFormatted: format(
                            parseISO(appointment.date),
                            "HH:mm"
                        ),
                    };
                }
            );
            setAppointments(appointmentsFormatted);
        });
    }, [selectDay]);

    const morningAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            return parseISO(appointment.date).getHours() < 12;
        });
    }, [appointments]);

    const afternonAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            return parseISO(appointment.date).getHours() >= 12;
        });
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        const nextAppointmentItem = appointments.find((appointment) => {
            console.log(appointment);
            return isAfter(parseISO(appointment.date), new Date());
        });
        return nextAppointmentItem;
    }, [appointments]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Profile>
                        <img src={logo} alt="" />
                        <div>
                            <img src={user.avatar_url} alt="" />
                            <div>
                                <strong>Bem vindo,</strong>
                                <Link to="/profile">
                                    <p>{user.name}</p>
                                </Link>
                            </div>
                        </div>
                    </Profile>
                    <button type="submit" onClick={signOut}>
                        <FiLogOut size={20} color="#999591" />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Appointments>
                    <h1>Horários agendados</h1>
                    <DateComponent>
                        <p>
                            {isToday(selectDay) && <span>Hoje</span>}
                            <span>{selectDateAsText}</span>
                            <span>Segunda-feira</span>
                        </p>
                    </DateComponent>

                    {isToday(selectDay) && nextAppointment && (
                        <NextAppointment>
                            <h2>Agendamento a seguir</h2>
                            <div>
                                <img
                                    src={nextAppointment?.user.avatar_url}
                                    alt=""
                                />
                                <p>{nextAppointment?.user.name}</p>
                                <div>
                                    <FiClock />
                                    <p>{nextAppointment?.hourFormatted}</p>
                                </div>
                            </div>
                        </NextAppointment>
                    )}

                    <Section>
                        <p>Manhã</p>

                        {morningAppointments.length === 0 && (
                            <span>Nenhum agendamento nesse período</span>
                        )}

                        {morningAppointments.map((appointment) => {
                            return (
                                <Appointment>
                                    <FiClock />
                                    <p>{appointment.hourFormatted}</p>
                                    <div>
                                        <img
                                            src={appointment.user.avatar_url}
                                            alt=""
                                        />
                                        <p>{appointment.user.name}</p>
                                    </div>
                                </Appointment>
                            );
                        })}
                    </Section>
                    <Section>
                        <p>Tarde</p>

                        {morningAppointments.length === 0 && (
                            <span>Nenhum agendamento nesse período</span>
                        )}
                        {afternonAppointments.map((appointment) => {
                            return (
                                <Appointment>
                                    <FiClock />
                                    <p>{appointment.hourFormatted}</p>
                                    <div>
                                        <img
                                            src={appointment.user.avatar_url}
                                            alt=""
                                        />
                                        <p>{appointment.user.name}</p>
                                    </div>
                                </Appointment>
                            );
                        })}
                    </Section>
                </Appointments>
                <Calendar>
                    <DayPicker
                        fromMonth={new Date()}
                        weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                        selectedDays={selectDay}
                        onDayClick={handleDateChange}
                        onMonthChange={handleMonthChange}
                        months={[
                            "Janeiro",
                            "Fevereiro",
                            "Março",
                            "Abril",
                            "Maio",
                            "Junho",
                            "Julho",
                            "Agosto",
                            "Setembro",
                            "Novembro",
                            "Outubro",
                            "Dezembro",
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;
