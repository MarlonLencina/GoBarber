import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IappointmentsRepository from '../repositories/Iappointment-repository';
import { eachDayOfInterval, getDate, getDaysInMonth, isAfter } from 'date-fns';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class listProviderMonthAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private AppointmentsRepository: IappointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointmentsInMonth =
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

            const currentDate = new Date(Date.now());
            const compareDate = new Date(year, month - 1, day);

            return {
                day,
                available:
                    appointmentsInDay.length < 10 &&
                    isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}

export default listProviderMonthAvailability;
