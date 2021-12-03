import Appointment from '../entities/appointments-model';
import { Raw, Repository } from 'typeorm';
import ICreateAppointmentDTO from '@modules/appointments/repositories/dtos';
import IFindAllinMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllinMonthFromProviderDTO';
import IappointmentsRepository from '@modules/appointments/repositories/Iappointment-repository';
import IFindAllinDayFromProviderDTO from '@modules/appointments/dtos/IFindAllinDayFromProviderDTO';
import { getRepository } from 'typeorm';

class AppointmentsRepository implements IappointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findAllinDayFromProvider({
        day,
        month,
        year,
        provider_id,
    }: IFindAllinDayFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');
        console.log(`${parsedDay}-${parsedMonth}-${year}`);
        const findAppointments = this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    (dateFieldName) =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user']
        });

        return findAppointments;
    }

    public async findAllInMonthFromProvider({
        month,
        year,
        provider_id,
    }: IFindAllinMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const findAppointments = this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    (dateFieldName) =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return findAppointments;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            date,
            user_id,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
