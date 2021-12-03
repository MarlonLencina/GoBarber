import startOfHour from 'date-fns/startOfHour';
import Appointment from '../infra/typeorm/entities/appointments-model';
import AppError from '@shared/errors/AppError';
import IappointmentsRepository from '@modules/appointments/repositories/Iappointment-repository';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { format } from 'date-fns';
import ICacheProvider from '@shared/providers/cacheProvider/models/ICacheProvider';

interface IRequest {
    date: Date;
    provider_id: string;
    user_id: string;
}

@injectable()
class createAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IappointmentsRepository,
        @inject('NotificationsRepository')
        private NotificationsRepository: INotificationsRepository,
        @inject('CacheProvider')
        private CacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        date,
        user_id,
    }: IRequest): Promise<Appointment> {
        const parseStartHour = startOfHour(date);

        const findAppointmentInSameDate =
            await this.appointmentsRepository.findByDate(parseStartHour);

        if (findAppointmentInSameDate) {
            throw new AppError(
                'You cant create a appointment in an hour already booked',
                401,
            );
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: parseStartHour,
            user_id,
        });

        await this.CacheProvider.invalidate(
            `appointments-provider-list:${provider_id}:${format(
                parseStartHour, 'yyyy-M-dd'
            )}`,
        );

        const dateFomarted = format(parseStartHour, "dd/MM/yyyy 'ás' HH:mm");
        await this.NotificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFomarted}`,
        });

        return appointment;
    }
}

export default createAppointmentService;

/* const dateFomarted = format(parseStartHour, "dd/MM/yyyy 'ás' HH:mm")
await this.NotificationsRepository.create({recipient_id: provider_id, content: `Novo agendamento para dia ${dateFomarted}`})
 */
