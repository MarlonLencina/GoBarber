import createAppointmentService from '@modules/appointments/services/createAppointment-service';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '../repositories/fakes/fake-appointmentsRespository';
import fakeNotificationsRepository from '@modules/notifications/repositories/fakeNotificationRepository';

describe('CreateAppointment', () => {
    it('Should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new AppointmentsRepository();
        const FakeNotificationsRepository = new fakeNotificationsRepository();
        const createAppointment = new createAppointmentService(
            fakeAppointmentsRepository,
            FakeNotificationsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '12345678',
            user_id: 'user',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12345678');
    });

    it('Should not be able to create a new appointment on the same hour', async () => {
        const fakeAppointmentsRepository = new AppointmentsRepository();
        const FakeNotificationsRepository = new fakeNotificationsRepository();

        const createAppointment = new createAppointmentService(
            fakeAppointmentsRepository,
            FakeNotificationsRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11, 11, 11);

        const appointment = await createAppointment.execute({
            date: appointmentDate,
            provider_id: '12345678',
            user_id: 'user',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '12345678',
                user_id: 'user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
