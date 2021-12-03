import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IappointmentsRepository from '../repositories/Iappointment-repository';
import { eachDayOfInterval, getDate, getDaysInMonth } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointments-model';
import ICacheProvider from '@shared/providers/cacheProvider/models/ICacheProvider';
import appointment from '@modules/appointments/infra/typeorm/entities/appointments-model';
import { classToClass } from 'class-transformer';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class listProviderAppointmentsInDay {
    constructor(
        @inject('AppointmentsRepository')
        private AppointmentsRepository: IappointmentsRepository,
        @inject('CacheProvider')
        private CacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<Appointment[]> {
        let Appointments = await this.CacheProvider.recover<Appointment[]>(
            `appointments-provider-list:${provider_id}:${year}-${month}-${day}`,
        );

        if (!Appointments) {
            Appointments =
                await this.AppointmentsRepository.findAllinDayFromProvider({
                    provider_id,
                    day,
                    month,
                    year,
                });

            await this.CacheProvider.save(
                `appointments-provider-list:${provider_id}:${year}-${month}-${day}`,
                classToClass(Appointments),
            );
        }
        return Appointments;
    }
}

export default listProviderAppointmentsInDay;
