import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IappointmentsRepository from '../repositories/Iappointment-repository';
import {
    eachDayOfInterval,
    getDate,
    getDaysInMonth,
    getHours,
    isAfter,
} from 'date-fns';
import appointment from '../infra/typeorm/entities/appointments-model';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class listProviderDayAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private AppointmentsRepository: IappointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        /* const appointmentsInMonth =
            await this.AppointmentsRepository.findAllInMonthFromProvider({
                provider_id,
                month,
                year,
            });

        console.log(appointmentsInMonth);

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        const EachDayOfMonth = Array.from(
            {
                length: numberOfDaysInMonth,
            },
            (_, index) => index + 1,
        );

        const availability = EachDayOfMonth.map((day) => {
            const appointmentsInDay = appointmentsInMonth.filter(
                (appointment) => {
                    return getDate(appointment.date) === day;
                },
            );

            return {
                day,
                available: appointmentsInDay.length < 10,
            };
        });

        console.log(availability); */

        const currentDate = new Date(Date.now());

        const appointments =
            await this.AppointmentsRepository.findAllinDayFromProvider({
                day,
                month,
                year,
                provider_id,
            });

        const hourStart = 8;

        const eachHourArray = Array.from(
            {
                length: 10,
            },
            (_, index) => index + hourStart,
        );

        const availability = eachHourArray.map((hour) => {
            const hasAppointmentInHour = appointments.find(
                (appointment) => getHours(appointment.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);

            // data atual // data do agendamento

            return {
                hour,
                available:
                    !hasAppointmentInHour && isAfter(compareDate, currentDate),
            };
        });

        console.log(availability);

        return availability;
    }
}

export default listProviderDayAvailability;
