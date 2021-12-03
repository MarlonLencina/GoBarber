import { getYear, isEqual, getMonth, getDate } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/appointments-model';
import ICreateAppointmentDTO from '@modules/appointments/repositories/dtos';
import IappointmentsRepository from '@modules/appointments/repositories/Iappointment-repository';
import IFindAllinMonthFromProviderDTO from '../../dtos/IFindAllinMonthFromProviderDTO';
import { uuid } from 'uuidv4';
import IFindAllinDayFromProviderDTO from '@modules/appointments/dtos/IFindAllinDayFromProviderDTO';

class AppointmentsRepository implements IappointmentsRepository {
    private appointments: Appointment[] = [];

    public async findAllinDayFromProvider({
        provider_id,
        year,
        month,
        day,
    }: IFindAllinDayFromProviderDTO): Promise<Appointment[]> {
        const findAppointments = this.appointments.filter(
            (appointment) =>
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return findAppointments;
    }

    public async findAllInMonthFromProvider(
        data: IFindAllinMonthFromProviderDTO,
    ): Promise<Appointment[]> {
        const findAppointments = this.appointments.filter(
            (appointment) =>
                appointment.provider_id === data.provider_id &&
                getMonth(appointment.date) + 1 === data.month &&
                getYear(appointment.date) === data.year,
        );

        return findAppointments;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const AppointmentOnSameDate = this.appointments.find((appointment) => {
            return isEqual(appointment.date, date);
        });

        return AppointmentOnSameDate;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
