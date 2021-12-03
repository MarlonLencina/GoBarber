import Appointment from '../infra/typeorm/entities/appointments-model';
import ICreateAppointmentDTO from '../repositories/dtos';
import IFindAllinMonthFromProviderDTO from '../dtos/IFindAllinMonthFromProviderDTO';
import IFindAllinDayFromProviderDTO from '../dtos/IFindAllinDayFromProviderDTO';

interface IappointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(data: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFindAllinMonthFromProviderDTO,
    ): Promise<Appointment[]>;
    findAllinDayFromProvider(
        data: IFindAllinDayFromProviderDTO,
    ): Promise<Appointment[]>;
}

export default IappointmentsRepository;

